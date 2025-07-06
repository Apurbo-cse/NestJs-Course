// src/hashtag/hashtag.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { HashtagService } from './hashtag.service';
import { CreateHashtagDto } from './dto/create-hashtag.dto';

@Controller('hashtag')
export class HashtagController {
  constructor(private readonly hashtagService: HashtagService) { }

 @Post()
  async createNewHashtag(@Body() createHashtagDto: CreateHashtagDto) {
    try {
      return await this.hashtagService.createHashtag(createHashtagDto);
    } catch (error) {
      console.error('❌ Hashtag creation failed:', error);
      throw error; // re-throw so Nest returns error
    }
  }
}
