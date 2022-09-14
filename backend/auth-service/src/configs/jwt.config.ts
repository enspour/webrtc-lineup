import path from "node:path";

export default {
    accessToken: {
        publicKeyPath: path.join(__dirname, "../..", "keys/jwt/access/jwtRS256.key.pub"),
        privateKeyPath: path.join(__dirname, "../..", "keys/jwt/access/jwtRS256.key"),
        expiresIn: "10m",
    },
    refreshToken: {
        publicKeyPath: path.join(__dirname, "../..", "keys/jwt/refresh/jwtRS256.key.pub"),
        privateKeyPath: path.join(__dirname, "../..", "keys/jwt/refresh/jwtRS256.key"),
        expiresIn: "7d",
    }
}