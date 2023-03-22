import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Like, Repository } from 'typeorm';

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
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST);
    } else {
      const data = new Users();
      data.username = createUserDto.username;
      data.usercode = createUserDto.usercode;
      data.password = createUserDto.password;
      return this.users.save(data);
    }
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.users.findOne({
      where: {
        usercode: Like(createUserDto.usercode),
      },
    });
    if (user) {
      if (user.password == createUserDto.password) {
        const res = {
          data: '登录成功',
          token: '',
        };
        return res;
      } else {
        throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
      }
    } else {
      throw new HttpException('不存在该用户', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
