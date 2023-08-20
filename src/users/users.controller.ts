import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, Req, Res, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';
import { ValidateCreateUserPipe } from './pipes/validate-create-user/validate-create-user.pipe';
import { AuthGuard } from './guards/auth.guard';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get()
    @UseGuards(AuthGuard)
    getUsers() {
        return this.userService.fetchUsers();
    }

    @Post('create')
    @UsePipes(new ValidationPipe())
    createUser(@Body(ValidateCreateUserPipe) createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @UseGuards(JwtGuard)
    @Get(":id")
    getUserById(@Param('id', ParseIntPipe) id: number) {
        const user = this.userService.fetchUserById(1);

        if (!user)
            throw new HttpException("User not found", HttpStatus.BAD_REQUEST)
        return user;
    }
}
