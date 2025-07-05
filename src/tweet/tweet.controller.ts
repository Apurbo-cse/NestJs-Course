import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweets.dto';

@Controller('tweets')
export class TweetController {
    constructor(private readonly tweetService: TweetService) { }


    @Get(':userId')
    async getUserTweets(@Param('userId', ParseIntPipe) userId: number) {
        return this.tweetService.getTweets(userId);
    }


    @Post()
    async createTweet(@Body() createTweetDto: CreateTweetDto) {
        return this.tweetService.CreateTweet(createTweetDto);
    }


}
