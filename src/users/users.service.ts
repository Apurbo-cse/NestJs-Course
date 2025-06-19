export class UsersService {
    users: { id: number; name: string; age: number; gender: string; isMarrid: boolean }[] = [
        { id: 1, name: 'John', age: 28, gender: 'male', isMarrid: false },
        { id: 2, name: 'Mark', age: 32, gender: 'male', isMarrid: true },
    ];

    getAllUsers() {
        return this.users;
    }

    getUserById(id: number) {
        return this.users.find((x) => x.id === id);
    }

    createUser(user: { id: number; name: string; age: number; gender: string; isMarrid: boolean }) {
        this.users.push(user);
    }
}
