const fs = require("node:fs");
const util = require("node:util"); 

const JWTConfig = require("@configs/jwt.config").default;

const readFile = util.promisify(fs.readFile);

const readKeys = async ({ privateKeyPath, publicKeyPath }) => {
    const privateKey = await readFile(privateKeyPath, { encoding: "utf-8" });
    const publicKey = await readFile(publicKeyPath, { encoding: "utf-8" });
    return { privateKey, publicKey };
}

module.exports.loadKeysAccessJWT = async () => {
    const { privateKey, publicKey } = await readKeys(JWTConfig.accessToken);
    module.exports.accessTokenKeys = {
        privateKey,
        publicKey
    }
}

module.exports.loadKeysRefreshJWT = async () => {
    const { privateKey, publicKey } = await readKeys(JWTConfig.refreshToken);
    module.exports.refreshTokenKeys = {
        privateKey,
        publicKey
    }
}