import Ajv from "ajv"

const ajv = new Ajv();

export default (schema: object, data: any) => {
    const validator = ajv.compile(schema);

    validator(data)

    return validator.errors || [];
}