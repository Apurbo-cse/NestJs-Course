import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  public async getAllUsers() {
    try {
      return await this.userRepository.find({
        relations: { profile: true },
      });
    } catch (error) {
      if (error.code === 'ECNNREFUED') {
        throw new RequestTimeoutException('Database connection error', {
          description: 'Could not connect to database',
        });
      }
      console.error('getAllUsers error:', error);
      throw error;
    }
  }

  public async createUser(userDto: CreateUserDto) {
    try {
      userDto.profile ??= {};

      const [existingUsername, existingEmail] = await Promise.all([
        this.userRepository.findOne({ where: { userName: userDto.userName } }),
        this.userRepository.findOne({ where: { email: userDto.email } }),
      ]);

      const errors: Record<string, string> = {};
      if (existingUsername) errors.userName = 'Username already exists.';
      if (existingEmail) errors.email = 'Email already exists.';

      if (Object.keys(errors).length > 0) {
        throw new BadRequestException(errors);
      }

      const user = this.userRepository.create(userDto);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error.code === 'ECNNREFUED') {
        throw new RequestTimeoutException('Database connection error', {
          description: 'Could not connect to database',
        });
      }
      console.error('createUser error:', error);
      throw error;
    }
  }

  public async deleteUser(id: number) {
    await this.userRepository.delete(id);
    return { delete: true };
  }

  public async findUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
