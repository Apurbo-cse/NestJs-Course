// create-tweets.dto.ts
import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsOptional, IsString, IsNumber, IsInt, IsArray } from 'class-validator';

export class CreateTweetDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @Optional()
  @IsInt({ each: true })
  @IsArray()
  hashtags?: number[]

}
