import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/resources/user/schema/user.schema';
import { UserService } from 'src/resources/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    userValidate: Partial<User>,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOne(
      { email: userValidate.email },
      ['_id', 'password', 'username', 'name', 'email'],
    );
    if (user && user.password === userValidate.password) return user;
    return null;
  }

  async login(login: LoginDto) {
    const user: Omit<User, 'password'> & { _id?: string } =
      await this.validateUser(login);
    const payload = { username: user.email, sub: user._id };
    return {
      token: this.jwtService.sign(payload),
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        name: user.name,
      },
    };
  }
}
