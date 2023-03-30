import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly appService: AppService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt')) //校验登录的装饰器
  @Get('/auth/profile')
  async getProfile(@Request() req) {
    return this.authService.getProfile(req.user);
  }

  @Get()
  hello() {
    return "hello code start's gangster! ";
  }
}
