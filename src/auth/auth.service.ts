import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,

        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,

        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider,
    ) { }

    isAuthenticketd: boolean = false;

    public async login(loginDto: LoginDto) {
        // Step 1: Find the user with username
        const user = await this.userService.findUserByUsername(loginDto.userName);

        // Step 2: If user not found, findUserByUsername already throws exception

        // Step 3: Compare password
        const isPasswordMatch = await this.hashingProvider.comparePassword(
            loginDto.password,
            user.password,
        );

        if (!isPasswordMatch) {
            throw new UnauthorizedException('Invalid credentials!');
        }

        // Step 4: Return success (JWT access token logic can be added here)
        return user
    }

    public async signup(createUserDto: CreateUserDto) {
        return await this.userService.createUser(createUserDto);
    }
}
