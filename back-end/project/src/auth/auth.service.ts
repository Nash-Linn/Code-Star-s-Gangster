import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(Users, 'cs_gangster')
    private readonly users: Repository<Users>,
  ) {}

  async validateUser(usercode: string, password: string): Promise<any> {
    const user = await this.users
      .createQueryBuilder('user')
      .where('user.usercode = :usercode', { usercode: usercode })
      .addSelect('user.password')
      .getOne();

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
    const payload = {
      usercode: user.usercode,
      username: user.username,
      roles: user.roles,
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getProfile(user: any) {
    const findUser = await this.usersService.findOne(user.usercode);
    const payload = {
      usercode: findUser.usercode,
      username: findUser.username,
      roles: findUser.roles,
      id: findUser.id,
    };
    return {
      ...findUser,
      access_token: this.jwtService.sign(payload),
    };
  }
}
