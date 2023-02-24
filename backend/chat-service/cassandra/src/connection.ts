import cassandra from "cassandra-driver";

import Repository from "./Repositories/Repository";

import serverConfig from "@configs/server.config";

let repository: Repository;

const connect = async () => {
    const authProvider = new cassandra.auth.PlainTextAuthProvider(
        serverConfig.cassandraUser,
        serverConfig.cassandraPassword
    );

    const client = new cassandra.Client({
        contactPoints: [serverConfig.cassandraURL],
        localDataCenter: 'datacenter1',
        authProvider,
        encoding: { 
            useBigIntAsLong: true,
            useBigIntAsVarint: true
        }
    });

    repository = new Repository(client, serverConfig.cassandraKeyspace)
    
    await client.connect(); 

    await repository.initialize();
}

export {
    connect,
    repository  
}


