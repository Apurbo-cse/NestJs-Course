import { Profile } from "src/profile/entity/profile.entity";
import { Tweet } from "src/tweet/entity/tweet.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 24,
        unique: true
    })
    userName: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 100,
        unique: true
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 100
    })
    password: string;

    @OneToOne(() => Profile, (profile) => profile.user, {
        cascade: ['insert'],
    })
    profile?: Profile


    @OneToMany(() => Tweet, (tweet) => tweet.user)
    tweets: Tweet[]

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}