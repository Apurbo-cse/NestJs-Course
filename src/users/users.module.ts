import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./entity/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "src/profile/entity/profile.entity";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
    imports: [TypeOrmModule.forFeature([User, Profile])]
})

export class UsersModule {

}