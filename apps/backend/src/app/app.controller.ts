import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '@cineman/auth';
import { LocalAuthGuard } from '@cineman/auth';
import { Public } from '@cineman/authorization';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @Public()
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('auth/register')
  async register(@Body() body) {
    return this.authService.register(body);
  }
}
