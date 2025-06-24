import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TweetService {
    constructor(private readonly usersService: UsersService) { }

    tweets: { text: string; date: Date; userId: number }[] = [
        { text: 'some tweet', date: new Date('2025-06-06'), userId: 1 },
        { text: 'some other tweet', date: new Date('2025-06-12'), userId: 2 },
    ];

    getTweets(userId: number) {
        const user = this.usersService.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const tweets = this.tweets.filter((tweet) => tweet.userId === userId);

        const response = tweets.map((t) => ({
            text: t.text,
            date: t.date,
            name: user.name,
        }));

        return response;
    }
}
