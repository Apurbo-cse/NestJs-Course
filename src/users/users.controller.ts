import { Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    @Get()
    getUsers() {
        const usersService = new UsersService();
        return usersService.getAllUsers();
    }

    @Post()
    creatUser() {
        const user = { id: 3, name: 'Harry', age: 23, gender: 'female', isMarrid: false }
        const usersService = new UsersService();
        usersService.createUser(user);
        return 'A new user has been created!'
    }
}