const { loadPublicKeyAccessToken } = require("core/utils/jwt");

const logger = require("@logger").default;

const serverConfig = require("@configs/server.config").default;

const domain = serverConfig.domain;

module.exports.loadPublicKeyAccessJWT = async () => {
    const key = await loadPublicKeyAccessToken(domain);
    module.exports.accessToken = {
        publicKey: key
    }

    logger.log("Public Key is success loaded");
}
