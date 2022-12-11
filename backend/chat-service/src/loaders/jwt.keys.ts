import { loadPublicKeyAccessToken } from "core/utils/jwt";

import servicesConfig from "@configs/services.config";

const { auth } = servicesConfig;

const accessToken = {
    publicKey: "",
}

const loadPublicKeyAccessJWT = async () => {
    const key = await loadPublicKeyAccessToken(auth);
    accessToken.publicKey = key;
}

export {
    loadPublicKeyAccessJWT,
    accessToken
}
