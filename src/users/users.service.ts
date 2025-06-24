import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class UsersService {

    constructor(@Inject(forwardRef(() => AuthService)) private readonly authService: AuthService) { }

    users: { id: number; name: string; email: string; gender: string; isMarried: boolean, password: string }[] = [
        { id: 1, name: 'John', email: 'john@gmail.com', gender: 'male', isMarried: false, password: 'test1234' },
        { id: 2, name: 'Mark', email: 'mark@gmail.com', gender: 'male', isMarried: true, password: 'test1234' },
        { id: 3, name: 'Joty', email: 'joty@gmail.com', gender: 'female', isMarried: false, password: 'test1234' },
    ];

    getAllUsers(isMarried?: boolean, limit?: number, page?: number) {


        let result = this.users;

        if (isMarried !== undefined) {
            result = result.filter(user => user.isMarried === isMarried);
        }

        if (limit !== undefined && page !== undefined) {
            const startIndex = (page - 1) * limit;
            result = result.slice(startIndex, startIndex + limit);
        }

        if (this.authService.isAuthenticketd) {
            return result;
        }
        return "You are not logged-in"


    }



    getUserById(id: number) {
        return this.users.find((x) => x.id === id);
    }

    createUser(user: { id: number; name: string; email: string; gender: string; isMarried: boolean, password: string }) {
        this.users.push(user);
    }
}
