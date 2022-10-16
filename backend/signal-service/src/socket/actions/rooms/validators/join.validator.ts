import validator from "@utils/validator"

const schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        password: { type: "string" },
    },
    required: ["id"],
    additionalProperties: false
}

export default (data: any) => validator(schema, data)