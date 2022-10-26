import { JSONSchemaType } from "ajv";

import validator from "@utils/validator";

export interface IceCandidatePayload {
    roomId: string;
    destinationId: string;
    iceCandidate: {
        candidate: string;
        sdpMid: string;
        sdpMLineIndex: number;
    };
};

const schema: JSONSchemaType<IceCandidatePayload> = {
    type: "object",
    properties: {
        roomId: { type: "string" },
        destinationId: { type: "string" },
        iceCandidate: {
            type: "object",
            properties: {
                candidate: { type: "string" },
                sdpMid: { type: "string"},
                sdpMLineIndex: { type: "integer" },
            },
            required: ["candidate", "sdpMid", "sdpMLineIndex"],
            additionalProperties: false
        },
    },
    required: ["roomId", "destinationId", "iceCandidate"],
    additionalProperties: false
}

export const iceCandidateValidator = (payload: IceCandidatePayload) => validator(schema, payload);

