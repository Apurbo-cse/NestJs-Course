// create-tweets.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

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
}
