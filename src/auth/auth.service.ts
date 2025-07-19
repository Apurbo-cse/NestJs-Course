import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import authConfig from './config/auth.config';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { HashingProvider } from './provider/hashing.provider';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,

    // @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService
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


    // Generate JWT & Send in the response
    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email
      },
      {
        secret: this.authConfiguration.secret,
        expiresIn: this.authConfiguration.expiresIn,
        audience: this.authConfiguration.audience,
        issuer: this.authConfiguration.issuer
      }
    );


    return {
      token: token
    }




  }


  public async signup(createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
