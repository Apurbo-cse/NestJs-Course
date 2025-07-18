import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get()
    getUsers() {

        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findUserById(id);
    }

    @Post()
    async createUser(@Body() user: CreateUserDto) {
        return await this.usersService.createUser(user);
    }

    @Delete(':id')
    public deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id)
    }


}
