import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Tweet } from './entities/tweet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTweetDto } from './dto/create-tweets.dto';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { UpdateTweetDto } from './dto/update-tweet.dto';

@Injectable()
export class TweetService {
    constructor(

        private readonly usersService: UsersService,
        private readonly hashtagService: HashtagService,
        @InjectRepository(Tweet) private readonly tweetRepository: Repository<Tweet>,
    ) { }


    public async getTweets(userId: number) {
        return await this.tweetRepository.find({
            where: { user: { id: userId } }, relations: { user: true, hashtags: true }
        })
    }

    public async CreateTweet(createTweetDto: CreateTweetDto) {

        // Fetch the full user entity using the userId
        const user = await this.usersService.findUserById(createTweetDto.userId);

        let hashtags = await this.hashtagService.findHashtags(createTweetDto.hashtags || []);



        if (!user) {
            throw new NotFoundException(`User with id ${createTweetDto.userId} not found`);
        }

        // Create the tweet using the full User object
        const tweet = this.tweetRepository.create(
            { ...createTweetDto, user, hashtags }
        );

        // Save the tweet
        return await this.tweetRepository.save(tweet);
    }

    public async updateTweet(updateTweet: UpdateTweetDto) {
        // Get hashtags from the instance, not class
        const hashtags = await this.hashtagService.findHashtags(updateTweet.hashtags || []);

        // Find tweet by ID
        const tweet = await this.tweetRepository.findOneBy({ id: updateTweet.id });

        // Handle tweet not found
        if (!tweet) {
            throw new NotFoundException(`Tweet with ID ${updateTweet.id} not found`);
        }

        // Safely update properties
        tweet.text = updateTweet.text ?? tweet.text;
        tweet.image = updateTweet.image ?? tweet.image;
        tweet.hashtags = hashtags;

        return await this.tweetRepository.save(tweet);
    }



    public async deleteTweet(id: number) {
        await this.tweetRepository.delete({
            id
        })

        return { deleted: true, id }
    }


}
