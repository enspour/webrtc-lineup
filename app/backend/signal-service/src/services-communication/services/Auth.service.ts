import fetch from "node-fetch";

import logger from "@logger";

import servicesConfig from "@configs/services.config";

class AuthService {
    async findUser(userId: string) {
        try {
            const { auth } = servicesConfig;
        
            const url = `http://${auth}/services-communication/auth-service/user/${userId}`;
    
            const response = await fetch(url);

            if (response.status === 200) {
                const data = await response.json();
                return data.body.user;
            }
    
            return null;
        } catch (e) {
            logger.log(`Error send to AuthService: ${e}`);
        }
    }
}

export default new AuthService();