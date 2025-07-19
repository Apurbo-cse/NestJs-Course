import { Controller, Delete, Get, Param, ParseIntPipe, Query, UseGuards, } from "@nestjs/common";
import { UsersService } from "./users.service";
import { PaginationQueryDto } from "src/common/pagination/dto/pagination-query.dto";
import { AuthorizeGuard } from "src/auth/guards/authorize.guard";


@Controller('users')
@UseGuards(AuthorizeGuard)
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


    @Delete(':id')
    public deleteUser(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id)
    }


}
