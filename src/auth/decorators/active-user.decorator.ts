import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ActiveUserType } from "../interfaces/active-user-type.interface";

export const ActiveUser = createParamDecorator((feild: keyof ActiveUserType | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    const user: ActiveUserType = request.user

    return feild ? user?.[feild] : user
})