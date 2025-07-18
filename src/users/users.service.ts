import { BadRequestException, Injectable, RequestTimeoutException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UsersService {

    constructor
        (
            @InjectRepository(User)
            private userRepository: Repository<User>,
            private readonly configService: ConfigService
        ) { }

    public async getAllUsers() {
        try {
            return await this.userRepository.find({
                relations: {
                    profile: true
                }
            })
        } catch (error) {

            if (error.code === 'ECNNREFUED')
                throw new RequestTimeoutException('An error has occured. please try agian later', {
                    description: 'Could not connect to database'
                })
            console.log('error :>> ', error);
        }

    }

    public async createUser(userDto: CreateUserDto) {

        try {
            // Create a Profile & Save
            userDto.profile = userDto.profile ?? {}

            // Create User Object
            let user = this.userRepository.create(userDto)

            // Save the user object
            return await this.userRepository.save(user)
        } catch (error) {

            if (error.code === 'ECNNREFUED')
                throw new RequestTimeoutException('An error has occured. please try agian later', {
                    description: 'Could not connect to database'
                })

                if( error.code === '23505'){
                    throw new BadRequestException('There is some duplicate value for the Database')
                }
            console.log('error :>> ', error);
        }
    }

    public async deleteUser(id: number) {

        // Delete User
        await this.userRepository.delete(id)

        // Send a response
        return { delete: true }
    }

    public async findUserById(id: number) {
        return await this.userRepository.findOneBy({ id })
    }
}
