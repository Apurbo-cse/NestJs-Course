import { Body, Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { GetUserParamDto } from "./dtos/get-user-param.dto";
import { UpdateUserDto } from "./dtos/update-user-dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get(':isMarried')
    getUsers(
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
        @Param('isMarried', ParseBoolPipe) isMarried: boolean,
    ) {
        console.log('isMarried :>> ', isMarried);
        return this.usersService.getAllUsers(isMarried, limit, page);
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

    @Patch()
    updateUser(@Body() user: UpdateUserDto) {
        console.log('body :>> ', user);
        return "User updated successfully!"
    }
}
