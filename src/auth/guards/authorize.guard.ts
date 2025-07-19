import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";


@Injectable()
export class AuthorizeGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        // Extract Request From Execution Context
        const request: Request = context.switchToHttp().getRequest();



        // Extract Token From The Request Header

        // Bearer actual-json-token = ['Bearer', 'actual-json-token]
        const token = request.headers.authorization?.split(' ')[1];
        console.log('token :>> ', token);


        // Validate Token And Provide / Deny Access


        return true;
    }

} 