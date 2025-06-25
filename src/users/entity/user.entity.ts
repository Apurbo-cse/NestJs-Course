import { Profile } from "src/profile/entity/profile.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToOne(() => Profile)
    @JoinColumn()
    profile?: Profile

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}