import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import CreateUserDto from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: CreateUserDto) {
    const user = await this.authService.register(data);

    return {
      user,
      token: this.authService.getJwtToken(user.id),
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return {
      user: req.user,
      token: this.authService.getJwtToken(req.user.id),
    };
  }
}
