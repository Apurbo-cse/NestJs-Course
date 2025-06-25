import { Body, Controller, Get, Post, } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get()
    getUsers() {

        return this.usersService.getAllUsers();
    }

    @Post()
    async createUser(@Body() user: CreateUserDto) {
        return await this.usersService.createUser(user);
    }


}
