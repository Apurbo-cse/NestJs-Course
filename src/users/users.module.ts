import { forwardRef, Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "src/profile/entities/profile.entity";
import { PaginationModule } from "src/common/pagination/pagination.module";
import { AuthModule } from "src/auth/auth.module";
import authConfig from "src/auth/config/auth.config";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],

    imports: [
        PaginationModule,
        TypeOrmModule.forFeature([User, Profile]),
        forwardRef(() => AuthModule),
        ConfigModule.forFeature(authConfig),
        JwtModule.registerAsync(authConfig.asProvider())
    ]
})

export class UsersModule {

}