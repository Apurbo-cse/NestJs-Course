import {
  Injectable,
  HttpException,
  HttpStatus,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserAlreadyExistsException } from 'src/exceptions/user-already-exists.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 🔹 Get all users with profile
  async getAllUsers() {
    try {
      return await this.userRepository.find({
        relations: { profile: true },
      });
    } catch (error) {
      this.handleDatabaseError(error, 'getAllUsers');
    }
  }

  // 🔹 Create new user
  async createUser(userDto: CreateUserDto) {
    try {
      userDto.profile ??= {};

      const [existingUsername, existingEmail] = await Promise.all([
        this.userRepository.findOne({ where: { userName: userDto.userName } }),
        this.userRepository.findOne({ where: { email: userDto.email } }),
      ]);

      if (existingUsername) {
        throw new UserAlreadyExistsException('Username', userDto.userName);
      }

      if (existingEmail) {
        throw new UserAlreadyExistsException('Email', userDto.email);
      }

      const newUser = this.userRepository.create(userDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.handleDatabaseError(error, 'createUser');
    }
  }

  // 🔹 Delete a user by ID
  async deleteUser(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with ID ${id} not found.`,
          table: 'user',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return { deleted: true };
  }

  // 🔹 Find user by ID
  async findUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `User with ID ${id} not found.`,
          table: 'user',
        },
        HttpStatus.NOT_FOUND,
        {
          description: `User ID ${id} was not found in the system.`,
        },
      );
    }

    return user;
  }

  // 🔹 Handle connection or other errors
  private handleDatabaseError(error: any, method: string) {
    if (error.code === 'ECONNREFUSED') {
      throw new RequestTimeoutException('Database connection error', {
        description: 'Could not connect to the database.',
      });
    }
    console.error(`${method} error:`, error);
    throw error;
  }
}
