import cassandra from "cassandra-driver";
import { nanoid } from "nanoid";

import { Message, User } from "../types";

const toMessage = (row: cassandra.types.Row): Message => {
    const result: Message = {
        id: row.id,
        conference_id: row.conference_id,
        text: row.text,
        owner: row.owner,
        created_at: row.created_at,
        modified_at: row.modified_at,
    };

    return result;
}

export default class Repository {
    constructor(private client: cassandra.Client, private keyspace: string) {}

    async initialize() {
        await this.createKeyspace();
        await this.createEntries();
    }

    async createMessage(conference_id: string, text: string, owner: User): Promise<Message | null> {
        const id = nanoid();

        const queries = [
            {
                query: `
                    INSERT INTO ${this.keyspace}.messages
                    (id, conference_id, text, owner, created_at, modified_at) 
                    VALUES (?, ?, ?, ?, currentTimestamp(), currentTimestamp());
                `,
                params: [ id, conference_id, text, owner ]
            }, {
                query: `
                    INSERT INTO ${this.keyspace}.messages_by_conference_id
                    (id, conference_id, text, owner, created_at, modified_at) 
                    VALUES (?, ?, ?, ?, currentTimestamp(), currentTimestamp());
                `,
                params: [ id, conference_id, text, owner ]
            }
        ];

        await this.client.batch(queries, { prepare: true });

        return await this.findMessage(id, conference_id);
    }

    async findMessage(id: string, conference_id: string): Promise<Message | null> {
        const query = `
            SELECT * FROM ${this.keyspace}.messages WHERE id = ? AND conference_id = ?;
        `
        const params = [id, conference_id];

        const result = await this.client.execute(query, params, { prepare: true });

        if (result.rowLength) {
            return toMessage(result.first());
        }

        return null;
    }

    async findMessages(conference_id: string): Promise<Message[]> {
        const query = `
            SELECT * FROM ${this.keyspace}.messages_by_conference_id WHERE conference_id = ?;
        `
        const params = [conference_id];

        const result = await this.client.execute(query, params, { prepare: true });

        if (result.rowLength) {
            return result.rows.map(row => toMessage(row));
        }

        return [];
    }

    private async createKeyspace() {
        const query = `
            CREATE KEYSPACE IF NOT EXISTS ${this.keyspace} 
            WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1' };
        `;

        await this.client.execute(query);
    }

    private async createEntries() {
        const userTypeQuery = `
            CREATE TYPE IF NOT EXISTS ${this.keyspace}.user (
                id bigint,
                name text
            );
        `;
        
        const messageTableQuery = `
            CREATE TABLE IF NOT EXISTS ${this.keyspace}.messages (
                id text, 
                conference_id text, 
                text text, 
                owner frozen<user>,
                created_at timestamp,
                modified_at timestamp,
                PRIMARY KEY (id, conference_id)
            ); 
        `
        
        const messageByConferenceIdTableQuery = `
            CREATE TABLE IF NOT EXISTS ${this.keyspace}.messages_by_conference_id (
                id text, 
                conference_id text, 
                text text, 
                owner frozen<user>,
                created_at timestamp,
                modified_at timestamp,
                PRIMARY KEY (conference_id, created_at)
            );
        `;

        await this.client.execute(userTypeQuery);
        await this.client.execute(messageTableQuery);
        await this.client.execute(messageByConferenceIdTableQuery);
    }
}