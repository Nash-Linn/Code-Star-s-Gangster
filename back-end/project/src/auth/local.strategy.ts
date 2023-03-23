import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'usercode', //如果不设置策略默认校验的是 username
      passwordField: 'password', //password
    } as IStrategyOptions);
  }

  async validate(usercode: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(usercode, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
