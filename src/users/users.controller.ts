import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }

    @Get()
    async getUsers(@Query() paginationQueryDto: PaginationQueryDto) {
        return this.usersService.getAllUsers(paginationQueryDto);
    }

    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findUserById(id);
    }

    // @Post()
    // async createUser(@Body() user: CreateUserDto) {
    //     return await this.usersService.createUser(user);
    // }
    

    @Delete(':id')
    public deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id)
    }


}
