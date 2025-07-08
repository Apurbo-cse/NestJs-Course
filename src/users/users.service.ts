import { Injectable } from "@nestjs/common";
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


    getAllUsers() {
        const environment = this.configService.get<string>('ENV_MODE')
        console.log('environment :>> ', environment);
        return this.userRepository.find({
            relations: {
                profile: true
            }
        })
    }

    public async createUser(userDto: CreateUserDto) {

        // Create a Profile & Save
        userDto.profile = userDto.profile ?? {}

        // Create User Object
        let user = this.userRepository.create(userDto)

        // Save the user object
        return await this.userRepository.save(user)
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
