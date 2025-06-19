export class UsersService {
    users: { id: number; name: string; email: string; gender: string; isMarrid: boolean }[] = [
        { id: 1, name: 'John', email: 'john@gmail.com', gender: 'male', isMarrid: false },
        { id: 2, name: 'Mark', email: 'mark@gmail.com', gender: 'male', isMarrid: true },
        { id: 2, name: 'Joty', email: 'joty@gmail.com', gender: 'female', isMarrid: false },
    ];

    getAllUsers() {
        return this.users;
    }

    getUserById(id: number) {
        return this.users.find((x) => x.id === id);
    }

    createUser(user: { id: number; name: string; email: string; gender: string; isMarrid: boolean }) {
        this.users.push(user);
    }
}
