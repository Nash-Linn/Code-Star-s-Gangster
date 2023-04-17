import { join, extname } from 'path';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
import { alterPasswordDto } from './dto/alter-password.dto';
import { getFileFromMinio, putFileToMinio } from 'src/utils/minio';

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
        users.id,
        users.usercode ,
        users.username ,
        users.avatar,
        users.roles
    `,
      )
      .where('users.usercode = :usercode', { usercode: usercode })
      .getRawOne();

    return user;
  }

  async updateAvatar(usercode: string, file: any) {
    const fileName = dealFileNameAddDate(file);
    ftpPutFile(file, `/static/avatars/${fileName}`);
    putFileToMinio(file, 'code-star-gangster', `/avatars/${fileName}`);
    const res = await this.users
      .createQueryBuilder('users')
      .update()
      .set({ avatar: fileName })
      .where('usercode = :usercode', { usercode: usercode })
      .execute();
    return res;
  }

  async getAvatar(response, filename) {
    const filePath = join('avatars', filename);
    getFileFromMinio(response, 'code-star-gangster', filePath);
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

  async alterPassword(usercode: string, body: alterPasswordDto) {
    const user = await this.users
      .createQueryBuilder('users')
      .select(
        `
        users.usercode,
        users.password
      `,
      )
      .where('usercode = :usercode', { usercode: usercode })
      .getRawOne();

    if (user.password == body.password) {
      const res = await this.users
        .createQueryBuilder('users')
        .update()
        .set({ password: body.newPassword })
        .where('usercode = :usercode', { usercode: usercode })
        .execute();
      return res;
    } else {
      throw new HttpException('原密码错误', HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
