import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "src/profile/entities/profile.entity";
import { PaginationModule } from "src/common/pagination/pagination.module";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],

    imports: [
        PaginationModule, 
        TypeOrmModule.forFeature([User, Profile])
    ]
})

export class UsersModule {

}