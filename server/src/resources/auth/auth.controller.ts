import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/resources/user/schema/user.schema';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './shared/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth')
  async login(@Body() loginDto: LoginDto): Promise<{
    token: string;
    user: Partial<User>;
  }> {
    return await this.authService.login(loginDto);
  }
}
