import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweets.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { PaginationQueryDto } from 'src/common/pagination/dto/pagination-query.dto';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  // ✅ GET /tweets/:userId?page=1&limit=10
  @Get(':userId')
  async getUserTweets(
    @Param('userId', ParseIntPipe) userId: number,
    @Query() paginationQueryDto: PaginationQueryDto,
  ) {
    return this.tweetService.getTweets(userId, paginationQueryDto);
  }

  // ✅ POST /tweets
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTweet(@Body() tweetDto: CreateTweetDto) {
    return this.tweetService.CreateTweet(tweetDto);
  }

  // ✅ PATCH /tweets
  @Patch()
  async updateTweet(@Body() tweetDto: UpdateTweetDto) {
    return this.tweetService.updateTweet(tweetDto);
  }

  // ✅ DELETE /tweets/:id
  @Delete(':id')
  async deleteTweet(@Param('id', ParseIntPipe) id: number) {
    return this.tweetService.deleteTweet(id);
  }
}
