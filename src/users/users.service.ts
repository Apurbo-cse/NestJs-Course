import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
    users: { id: number; name: string; email: string; gender: string; isMarried: boolean }[] = [
        { id: 1, name: 'John', email: 'john@gmail.com', gender: 'male', isMarried: false },
        { id: 2, name: 'Mark', email: 'mark@gmail.com', gender: 'male', isMarried: true },
        { id: 3, name: 'Joty', email: 'joty@gmail.com', gender: 'female', isMarried: false },
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

        return result;
    }



    getUserById(id: number) {
        return this.users.find((x) => x.id === id);
    }

    createUser(user: { id: number; name: string; email: string; gender: string; isMarried: boolean }) {
        this.users.push(user);
    }
}
