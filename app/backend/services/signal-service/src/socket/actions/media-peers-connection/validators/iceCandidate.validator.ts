import { JSONSchemaType } from "ajv";

import validator from "@utils/validator";

export interface IceCandidatePayload {
    channelId: string;
    peerId: string;
    iceCandidate: {
        candidate: string;
        sdpMid: string;
        sdpMLineIndex: number;
        usernameFragment: string;
    };
};

const schema: JSONSchemaType<IceCandidatePayload> = {
    type: "object",
    properties: {
        channelId: { type: "string" },
        peerId: { type: "string" },
        iceCandidate: {
            type: "object",
            properties: {
                candidate: { type: "string" },
                sdpMid: { type: "string"},
                sdpMLineIndex: { type: "integer" },
                usernameFragment: { type: "string" },
            },
            required: ["candidate", "sdpMid", "sdpMLineIndex"],
            additionalProperties: false
        },
    },
    required: ["channelId", "peerId", "iceCandidate"],
    additionalProperties: false
}

export const iceCandidateValidator = (payload: IceCandidatePayload) => validator(schema, payload);

