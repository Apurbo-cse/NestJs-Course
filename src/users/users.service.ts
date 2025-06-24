export class UsersService {
    users: { id: number; name: string; email: string; gender: string; isMarried: boolean }[] = [
        { id: 1, name: 'John', email: 'john@gmail.com', gender: 'male', isMarried: false },
        { id: 2, name: 'Mark', email: 'mark@gmail.com', gender: 'male', isMarried: true },
        { id: 2, name: 'Joty', email: 'joty@gmail.com', gender: 'female', isMarried: false },
    ];

    getAllUsers(isMarried: boolean, limit: number, page: number) {
        // isMarried অনুযায়ী ফিল্টার করো
        const filteredUsers = this.users.filter(user => user.isMarried === isMarried);

        // pagination: skip ও take (slice ব্যবহার)
        const startIndex = (page - 1) * limit;
        const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);

        return paginatedUsers;
    }



    getUserById(id: number) {
        return this.users.find((x) => x.id === id);
    }

    createUser(user: { id: number; name: string; email: string; gender: string; isMarried: boolean }) {
        this.users.push(user);
    }
}
