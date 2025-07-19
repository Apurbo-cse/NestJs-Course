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
    const user = await this.userService.findUserByUsername(loginDto.userName);

    console.log('🔐 Raw input password:', loginDto.password);
    console.log('🔒 Hashed password from DB:', user.password);

    const isPasswordMatch = await this.hashingProvider.comparePassword(
      loginDto.password,
      user.password,
    );

    console.log('✅ Password matched?', isPasswordMatch);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials!');
    }

    return {
      data: user,
      success: true,
      message: 'User logged in successfully'
    }
  }


  public async signup(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
