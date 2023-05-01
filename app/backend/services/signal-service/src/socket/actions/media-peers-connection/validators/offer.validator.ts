import { JSONSchemaType } from "ajv";

import validator from "@utils/validator";

export interface OfferPayload {
    channelId: string;
    peerId: string;
    offer: {
        type: string;
        sdp: string;
    };
}

const schema: JSONSchemaType<OfferPayload> = {
    type: "object",
    properties: {
        channelId: { type: "string" },
        peerId: { type: "string" },
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
    required: ["channelId", "peerId", "offer"],
    additionalProperties: false
}

export const offerValidator = (payload: OfferPayload) => validator(schema, payload);