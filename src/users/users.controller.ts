import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {

    @Get()
    getUsers(@Query() query: any) {
        const usersService = new UsersService();
        if (query.gender) {
            return usersService.getAllUsers().filter(u => u.gender === query.gender)
        }
        return usersService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id') id: any) {
        const usersService = new UsersService();
        return usersService.getUserById(+id)
    }


    @Post()
    creatUser() {
        const user = { id: 3, name: 'Harry', age: 23, gender: 'female', isMarrid: false }
        const usersService = new UsersService();
        usersService.createUser(user);
        return 'A new user has been created!'
    }
}