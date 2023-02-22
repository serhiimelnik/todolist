import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private jwtService: JwtService) { }

  private id: number = 0;
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }

    return null;
  }

  async signup(createUserDto: CreateUserDto) {
    this.id++;
    const password = await bcrypt.hash(createUserDto.password, 10);
    const user = new User(this.id, createUserDto.email, password);
    this.users.push(user);

    return this.genAccessToken(user);
  }

  async signin(user: User) {
    return this.genAccessToken(user);
  }


  private genAccessToken(user: User) {
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
