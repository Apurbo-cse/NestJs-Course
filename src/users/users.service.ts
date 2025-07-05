import { Injectable } from "@nestjs/common";

import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { Profile } from "src/profile/entity/profile.entity";

@Injectable()
export class UsersService {

    constructor
        (
            @InjectRepository(User)
            private userRepository: Repository<User>,

            @InjectRepository(Profile)
            private profileRepository: Repository<Profile>

        ) { }


    getAllUsers() {
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
