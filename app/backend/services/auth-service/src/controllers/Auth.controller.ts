import { Request, Response } from "express";

import UserService from "@services/User.service";
import JWTService from "@services/JWT.service";

import { accessTokenKeys } from "@loaders/jwt.keys";

import { validatePassword, hashPassword } from "@utils/bcrypt";
import { decodeAccessJWT } from "@utils/jwt";
import { getCookie } from "@utils/cookie";

import BadRequestResponse from "core/server/responses/BadRequest.response";
import SuccessResponse from "core/server/responses/Success.response";
import CreatedResponse from "core/server/responses/Created.response";

class AuthController {
    async login(req: Request, res: Response) {
        const email = req.body.email as string;
        const password = req.body.password as string;
        const rememberMe = req.body.remember_me as boolean;
        
        const userAuth = await UserService.findByEmail(email);
        
        if (userAuth) {
            const isEqualPassword = await validatePassword(password, userAuth.password);

            if (isEqualPassword) {
                const options = {
                    user: {
                        id: userAuth.user.id.toString(),
                        name: userAuth.user.name,
                    }
                }
                
                JWTService.setTokens(options, res);
                return new SuccessResponse("Login is successful").send(res);
            }
        }

        return new BadRequestResponse("Invalid Credentials. Please check the entered data.").send(res);
    }

    async signup(req: Request, res: Response) {
        const name = req.body.name as string;
        const email = req.body.email as string;
        const password = req.body.password as string;
        const rememberMe = req.body.remember_me as boolean;

        const hashedPassword = await hashPassword(password);

        const user = await UserService.create(name, email, hashedPassword);
        
        if (user) {
            const options = {
                user: {
                    id: user.id.toString(),
                    name: user.name,
                }
            }

            JWTService.setTokens(options, res);
            return new CreatedResponse("Signup is successful").send(res);
        }

        new BadRequestResponse("Invalid Credentials. Please check the entered data.").send(res);
    }

    async logout(req: Request, res: Response) {
        JWTService.clearTokens(res);

        new SuccessResponse("Logout is successful.").send(res);
    }

    async refresh(req: Request, res: Response) {
        const refreshToken = getCookie("refreshToken", req);
        if (refreshToken) {
            const isRefreshTokens = JWTService.refreshTokens(refreshToken, res);
            if (isRefreshTokens) {
                return new SuccessResponse("Refresh is successful.").send(res);
            }
        }

        return new BadRequestResponse("Refresh token is invalid.").send(res);
    }

    async me(req: Request, res: Response) {
        const token = getCookie("accessToken", req);
        const payload = decodeAccessJWT(token);

        const user = await UserService.findWithEmailById(BigInt(payload.user.id));
        
        if (user) {
            return new SuccessResponse({ user }).send(res);
        }

        return new BadRequestResponse("Bad request").send(res);;
    }

    async accessTokenPublicKey(req: Request, res: Response) {
        const publicKey = accessTokenKeys.publicKey;
        new SuccessResponse({ key: publicKey }).send(res);
    }
}

export default new AuthController();