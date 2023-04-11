import { join, extname } from 'path';
import {
  Injectable,
  HttpException,
  HttpStatus,
  StreamableFile,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Like, Repository } from 'typeorm';
import {
  ftpPutFile,
  dealFileNameAddDate,
  ftpGetFile,
  dealContentType,
} from 'src/utils/ftp';
import * as fs from 'fs';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users, 'cs_gangster')
    private readonly users: Repository<Users>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const count = await this.users.count({
      where: {
        usercode: Like(createUserDto.usercode),
      },
    });
    if (count) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    } else {
      const data = new Users();
      data.username = createUserDto.username;
      data.usercode = createUserDto.usercode;
      data.password = createUserDto.password;
      data.avatar = 'http://101.34.111.220:8080/static/common/imgs/avatar.png';
      return this.users.save(data);
    }
  }

  async getUserInfo(usercode: string) {
    const user = await this.users
      .createQueryBuilder('users')
      .select(
        `
        users.usercode ,
        users.username ,
        users.avatar,
        users.intro
    `,
      )
      .where('users.usercode = :usercode', { usercode: usercode })
      .getRawOne();
    return user;
  }

  async getProfile(usercode: string) {
    const user = await this.users
      .createQueryBuilder('users')
      .select(
        `
        users.usercode ,
        users.username ,
        users.avatar
    `,
      )
      .where('users.usercode = :usercode', { usercode: usercode })
      .getRawOne();

    return user;
  }

  async updateAvatar(usercode: string, file: any) {
    const fileName = dealFileNameAddDate(file);
    ftpPutFile(file, `/static/avatars/${fileName}`);
    const res = await this.users
      .createQueryBuilder('users')
      .update()
      .set({ avatar: fileName })
      .where('usercode = :usercode', { usercode: usercode })
      .execute();
    return res;
  }

  async getAvatar(response, filename) {
    response.setHeader('Content-Type', dealContentType(filename));
    response.setHeader(
      'Content-Disposition',
      `attachment; filename=${encodeURIComponent(filename)}`,
    );
    const filePath = join('static', 'avatars', filename);
    await ftpGetFile(filePath, response);
  }

  async updateUserInfo(usercode, updateUserDto: UpdateUserDto) {
    const res = await this.users
      .createQueryBuilder('users')
      .update()
      .set({
        username: updateUserDto.username,
        intro: updateUserDto.intro,
      })
      .where('usercode = :usercode', { usercode: usercode })
      .execute();
    return res;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
