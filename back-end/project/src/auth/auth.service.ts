import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(usercode: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(usercode);

    if (user) {
      if (user.password == password) {
        const { password, ...result } = user;
        return result;
      } else {
        throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('不存在该用户', HttpStatus.BAD_REQUEST);
    }
  }

  async login(user: any) {
    const payload = { usercode: user.usercode, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getProfile(user: any) {
    const findUser = await this.usersService.findOne(user.usercode);
    const payload = { usercode: findUser.usercode, id: findUser.id };
    const { password, ...rest } = findUser;
    return {
      ...rest,
      access_token: this.jwtService.sign(payload),
    };
  }
}
