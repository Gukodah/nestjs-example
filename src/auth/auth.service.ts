import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }

    async validateUser(username: string, password: string) {
        const user = this.usersService.findOneWithUsername(username);

        if (user && (await user).password == password) {
            const { password, ...result } = await user;
            return result;
        }

        return null;
    }

    async login(user) {
        const payload = {
            username: user.email,
            sub: {
                name: user.name
            }
        }

        return {
            ...user,
            accessToken: this.jwtService.sign(payload)
        }
    }
}
