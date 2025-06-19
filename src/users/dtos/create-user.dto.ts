import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNumber()
    id: number;

    @IsString({ message: 'Name should be a string value.' })
    @IsNotEmpty()
    @MinLength(3, { message: 'Name should be a minimum of 3 characters' })
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    gender?: string;

    @IsBoolean()
    isMarrid: boolean
}