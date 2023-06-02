import fetch, { Response } from "node-fetch";

import servicesConfig from "../configs/services.config";

const { auth } = servicesConfig;

class AuthServiceAPI {
    async loadPublicKeyAccessToken(): Promise<Response> {
        return await fetch(`http://${auth}/api/v1/auth-service/private/auth/access-token/public-key`);
    }
}

export default new AuthServiceAPI();