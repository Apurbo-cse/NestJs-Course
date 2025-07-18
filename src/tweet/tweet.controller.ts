import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch, Delete, Query } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweets.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

@Controller('tweets')
export class TweetController {
    constructor(private readonly tweetService: TweetService) { }


    @Get(':userId')
    async getUserTweets(
        @Param('userId', ParseIntPipe) userId: number,
        @Query() paginationQueryDto: PaginationQueryDto
    ) {
        console.log('paginationQueryDto :>> ', paginationQueryDto);
        return this.tweetService.getTweets(userId);
    }

    @Post()
    async createTweet(@Body() createTweetDto: CreateTweetDto) {
        return this.tweetService.CreateTweet(createTweetDto);
    }

    @Patch()
    async updateTweet(@Body() tweet: UpdateTweetDto) {
        return this.tweetService.updateTweet(tweet);
    }

    @Delete(':id')
    public DeleteTweet(@Param('id', ParseIntPipe) id: number) {
        return this.tweetService.deleteTweet(id)
    }


}
