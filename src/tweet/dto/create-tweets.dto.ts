import { IsNotEmpty, IsOptional, IsString, IsInt, IsArray } from 'class-validator';
import { Type } from 'class-transformer'; 

export class CreateTweetDto {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Type(() => Number) 
  hashtags?: number[];
}
