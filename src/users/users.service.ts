import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {

    private fakeUsers = [
        { username: "Gustavo", email: "oficialgukodah@gmail.com" },
        { username: "Pedro", email: "pedrao@gmail.com" },
        { username: "Carol", email: "carolzinha@gmail.com" }
    ];

    fetchUsers() {
        return this.fakeUsers
    }

    createUser(createUserData) {
        this.fakeUsers.push(createUserData);
        return;
    }

    fetchUserById(id: number) {
        return null;
    }

    async findOneWithUsername(username: string) {
        return { id: 1, username, email: "oficialgukodah@gmail.com", password: "123" }
    }
}
