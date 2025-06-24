import { Body, Controller, DefaultValuePipe, Get, Param, ParseBoolPipe, ParseIntPipe, Patch, Post, Query, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { GetUserParamDto } from "./dtos/get-user-param.dto";
import { UpdateUserDto } from "./dtos/update-user-dto";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers(
        @Query('isMarried') isMarriedRaw: string,
        @Query('limit') limitRaw: string,
        @Query('page') pageRaw: string,
    ) {
        const isMarried = isMarriedRaw !== undefined ? isMarriedRaw === 'true' : undefined;
        const limit = limitRaw !== undefined ? parseInt(limitRaw, 10) : undefined;
        const page = pageRaw !== undefined ? parseInt(pageRaw, 10) : undefined;

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
