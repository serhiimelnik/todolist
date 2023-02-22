import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SigninStrategy } from './signin.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    })
  ],
  providers: [UsersService, SigninStrategy, JwtStrategy],
  exports: [UsersService]
})
export class UsersModule { }
