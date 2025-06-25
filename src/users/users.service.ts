import { Injectable } from "@nestjs/common";

import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {

    constructor
        (
            @InjectRepository(User)
            private userRepository: Repository<User>
        ) { }


    getAllUsers() {
        return this.userRepository.find()
    }

    public async createUser(userDto: CreateUserDto) {
        // validate if a user exist with the given email
        const user = await this.userRepository.findOne({
            where: { email: userDto.email }
        })

        // Handle the error/ exception
        if (user) {
            return 'The user with thie given email already exists!'
        }

        // Create the User
        let newUser = this.userRepository.create(userDto)
        newUser = await this.userRepository.save(newUser)

        return newUser;

    }
}
