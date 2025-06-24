import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(@Inject(forwardRef(() => UsersService)) private readonly userService: UsersService) { }

    isAuthenticketd: Boolean = false

    login(email: string, pswd: string) {
        const user = this.userService.users.find(u => u.email === email && u.password === pswd)

        if (user) {
            this.isAuthenticketd = true
            return 'MY_TOCKEN'
        }
        return 'User does not exist!'
    }
}
