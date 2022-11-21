import fs from "node:fs";
import util from "node:util";

import JWTConfig from "@configs/jwt.config";

const readFile = util.promisify(fs.readFile);

const readKeys = async (
    { privateKeyPath, publicKeyPath }: { privateKeyPath: string, publicKeyPath: string }
) => {
    const privateKey = await readFile(privateKeyPath, { encoding: "utf-8" });
    const publicKey = await readFile(publicKeyPath, { encoding: "utf-8" });
    return { privateKey, publicKey };
}

const accessTokenKeys = {
    privateKey: "",
    publicKey: ""
};

const refreshTokenKeys = {
    privateKey: "",
    publicKey: ""
}

const loadKeysAccessJWT = async () => {
    const { privateKey, publicKey } = await readKeys(JWTConfig.accessToken);
    accessTokenKeys.privateKey = privateKey;
    accessTokenKeys.publicKey = publicKey;
}

const loadKeysRefreshJWT = async () => {
    const { privateKey, publicKey } = await readKeys(JWTConfig.refreshToken);
    refreshTokenKeys.privateKey = privateKey;
    refreshTokenKeys.publicKey = publicKey;
}

export {
    loadKeysAccessJWT,
    loadKeysRefreshJWT,
    accessTokenKeys,
    refreshTokenKeys
}