import { Controller, Request, Body, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/user.dto';
import { SigninGuard } from './users/guards/signin.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService
  ) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      return { message: 'User already exists' };
    }

    return this.usersService.signup(createUserDto);  
  }

  @UseGuards(SigninGuard)
  @Post('signin')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signin(@Request() req) {
    return this.usersService.signin(req.user);
  }
}
