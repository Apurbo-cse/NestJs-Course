import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './entities/tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweets.dto';

@Injectable()
export class TweetService {
    constructor(

        private readonly usersService: UsersService,
        @InjectRepository(Tweet) private readonly tweetRepository: Repository<Tweet>,
    ) { }


    public async getTweets(userId: number) {
        return await this.tweetRepository.find({
            where: { user: { id: userId } }, relations: { user: true }
        })
    }

    public async CreateTweet(createTweetDto: CreateTweetDto) {

        // Fetch the full user entity using the userId
        const user = await this.usersService.findUserById(createTweetDto.userId);
        if (!user) {
            throw new NotFoundException(`User with id ${createTweetDto.userId} not found`);
        }

        // Create the tweet using the full User object
        const tweet = this.tweetRepository.create(
            { ...createTweetDto, user: user }
        );

        // Save the tweet
        return await this.tweetRepository.save(tweet);
    }

}
