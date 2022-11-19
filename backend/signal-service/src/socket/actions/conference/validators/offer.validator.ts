import { JSONSchemaType } from "ajv";

import validator from "@utils/validator";

export interface OfferPayload {
    roomId: string;
    conferenceId: string;
    destinationId: string;
    offer: {
        type: string;
        sdp: string;
    };
}

const schema: JSONSchemaType<OfferPayload> = {
    type: "object",
    properties: {
        roomId: { type: "string" },
        conferenceId: { type: "string" },
        destinationId: { type: "string" },
        offer: { 
            type: "object",
            properties: {
                type: { type: "string" },
                sdp: { type: "string" }
            },
            required: ["type", "sdp"],
            additionalProperties: false
        },
    },
    required: ["roomId", "destinationId", "offer"],
    additionalProperties: false
}

export const offerValidator = (payload: OfferPayload) => validator(schema, payload);