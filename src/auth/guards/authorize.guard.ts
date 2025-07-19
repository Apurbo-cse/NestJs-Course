import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import authConfig from "../config/auth.config";


@Injectable()
export class AuthorizeGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        // Extract Request From Execution Context
        const request: Request = context.switchToHttp().getRequest();


        // Extract Token From The Request Header

        // Bearer actual-json-token = ['Bearer', 'actual-json-token]
        const token = request.headers.authorization?.split(' ')[1];
        console.log('token :>> ', token);


        // Validate Token And Provide / Deny Access
        if (!token) {
            throw new UnauthorizedException()
        }


        try {
            const payload = await this.jwtService.verifyAsync(token, this.authConfiguration)

            request['user'] = payload
            console.log('payload :>> ', payload);
        } catch (error) {
            throw new UnauthorizedException()
        }


        return true;
    }

} 