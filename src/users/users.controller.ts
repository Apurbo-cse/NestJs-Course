import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
    ) {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUserById(id);
    }

    @Post()
    createUser(@Body(new ValidationPipe()) user: CreateUserDto) {
        // this.usersService.createUser(user);
        console.log('user :>> ', user instanceof CreateUserDto);
        return `A new user has been created!`;
    }
}
