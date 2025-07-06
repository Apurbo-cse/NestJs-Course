// src/hashtag/hashtag.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from './entities/hashtag.entity';
import { In, Repository } from 'typeorm';
import { CreateHashtagDto } from './dto/create-hashtag.dto';

@Injectable()
export class HashtagService {
  constructor(
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) { }

  public async createHashtag(createHashtagDto: CreateHashtagDto) {
    const hashtag = this.hashtagRepository.create(createHashtagDto);

    try {
      return await this.hashtagRepository.save(hashtag);
    } catch (error) {
      console.error('❌ DB Error:', error); // <-- ✅ log raw error in console
      throw error; // <-- ✅ rethrow raw DB error so NestJS returns it as 500
    }
  }

  public async findHashtags(hashtags: number[]) {
    return await this.hashtagRepository.find({
      where: { id: In(hashtags) }
    })
  }

}
