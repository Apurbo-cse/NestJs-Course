import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hashtag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'text',
        nullable: false,
        unique: true,
    })
    @IsNotEmpty({ message: "Name should not be empty" })
    @IsString({ message: "Name must be a string" })
    name: string
}