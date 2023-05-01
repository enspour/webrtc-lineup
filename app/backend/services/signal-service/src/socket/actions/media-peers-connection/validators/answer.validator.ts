import { JSONSchemaType } from "ajv";

import validator from "@utils/validator";

export interface AnswerPayload {
    channelId: string;
    peerId: string;
    answer: {
        type: string;
        sdp: string;
    };
}

const schema: JSONSchemaType<AnswerPayload> = {
    type: "object",
    properties: {
        channelId: { type: "string" },
        peerId: { type: "string" },
        answer: { 
            type: "object",
            properties: {
                type: { type: "string" },
                sdp: { type: "string" }
            },
            required: ["type", "sdp"],
            additionalProperties: false
        },
    },
    required: ["channelId", "peerId", "answer"],
    additionalProperties: false
}

export const answerValidator = (payload: AnswerPayload) => validator(schema, payload);