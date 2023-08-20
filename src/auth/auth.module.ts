import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  providers: [AuthService, UsersService, JwtStrategy, JwtService],
  controllers: [AuthController]
})
export class AuthModule { }
