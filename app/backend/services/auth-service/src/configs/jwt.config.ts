import path from "node:path";

export default {
    accessToken: {
        publicKeyPath: path.join(__dirname, "../..", "keys/accessToken/jwtRS256.key.pub"),
        privateKeyPath: path.join(__dirname, "../..", "keys/accessToken/jwtRS256.key"),
        expiresIn: "20m",
    },
    refreshToken: {
        publicKeyPath: path.join(__dirname, "../..", "keys/refreshToken/jwtRS256.key.pub"),
        privateKeyPath: path.join(__dirname, "../..", "keys/refreshToken/jwtRS256.key"),
        expiresIn: "7d",
    }
}