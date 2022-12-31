import { JSONSchemaType } from "ajv";
import validator from "@utils/validator";

export interface JoinRoomPayload {
    id: string
    password: string
}

const schema: JSONSchemaType<JoinRoomPayload> = {
    type: "object",
    properties: {
        id: { type: "string" },
        password: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false
}

export const joinRoomValidator = (payload: JoinRoomPayload) => validator(schema, payload);