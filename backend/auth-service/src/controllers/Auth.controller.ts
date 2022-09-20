import { Request, Response } from "express"

import AuthService from "@services/Auth.service";
import JWTService from "@services/JWT.service";

import { validatePassowrd, hashPassword } from "@utils/bcrypt";

import BadRequestResponse from "core/server-responses/responses/BadRequest.response";
import UnauthorizedResponse from "core/server-responses/responses/Unauthorized.response";
import SuccessResponse from "core/server-responses/responses/Success.response";
import CreatedResponse from "core/server-responses/responses/Created.response";

export default class AuthController {
    async login(req: Request, res: Response) {
        const email = req.body.email as string;
        const password = req.body.password as string;
        const rememberMe = req.body.remember_me as boolean;
        
        const userAuth = await AuthService.findByEmail(email);
        
        if (userAuth) {
            const isEqualPassword = await validatePassowrd(password, userAuth.password);

            if (isEqualPassword) {
                const options = {
                    user: {
                        id: userAuth.user.id.toString(),
                        name: userAuth.user.name,
                        email: userAuth.email
                    }
                }
                JWTService.setTokens(options, res);
                return new SuccessResponse("Login is successfull").send(res);
            }
        }

        return new BadRequestResponse("Email or password is invalid").send(res);
    }

    async signup(req: Request, res: Response) {
        const name = req.body.name as string;
        const email = req.body.email as string;
        const password = req.body.password as string;
        const rememberMe = req.body.remember_me as boolean;

        const hashedPassword = await hashPassword(password);

        const user = await AuthService.create(name, email, hashedPassword);
        
        const options = {
            user: {
                id: user.id.toString(),
                name: user.name,
                email: user.email
            }
        }

        JWTService.setTokens(options, res);

        new CreatedResponse("Signup is successfull").send(res);
    }

    async logout(req: Request, res: Response) {
        JWTService.clearTokens(res);

        new SuccessResponse("Logout is successful.").send(res);
    }

    async me(req: Request, res: Response) {
        console.log(req.cookies);
        const payload = JWTService.verifyAndDecodeAccessToken(req);

        if (payload) {
            return new SuccessResponse(payload).send(res);
        }

        // try refresh tokens

        new UnauthorizedResponse("Please authorize.").send(res);
    }
}