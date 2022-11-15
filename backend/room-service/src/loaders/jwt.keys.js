const { loadPublicKeyAccessToken } = require("core/utils/jwt");

const serverConfig = require("@configs/server.config").default;

const { backend } = serverConfig;

module.exports.loadPublicKeyAccessJWT = async () => {
    const key = await loadPublicKeyAccessToken(backend);
    module.exports.accessToken = {
        publicKey: key
    }
}
