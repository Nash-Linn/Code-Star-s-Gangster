import {
  Injectable,
  UploadedFile,
  StreamableFile,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateBlogsManageDto } from './dto/create-blogs-manage.dto';
import { UpdateBlogsManageDto } from './dto/update-blogs-manage.dto';
import { Blogs } from './entities/blogs-manage.entity';
import { Users } from 'src/users/entities/user.entity';
@Injectable()
export class BlogsManageService {
  constructor(
    @Inject('fileDir') private readonly fileDir: string,
    @InjectRepository(Blogs, 'cs_gangster')
    private readonly blogs: Repository<Blogs>,
  ) {}
  getImage(res, params) {
    const url = this.fileDir + params.url;
    res.download(url);
    return {
      code: 200,
      msg: '成功',
      url,
    };
  }

  async create(req, file, body) {
    const data = new Blogs();
    data.creator = req.user.id;

    data.title = body.title;
    data.summary = body.summary;
    data.content = body.content;
    if (file) {
      data.coverUrl = file.filename;
    }
    const res = await this.blogs.save(data);
    return {
      id: res.id,
    };
  }

  async getBlogList(query: {
    keyWord: string;
    page: number;
    pageSize: number;
  }) {
    const page = query.page ? query.page : 1;
    const pageSize = query.pageSize ? query.pageSize : 10;
    const keyWord = query.keyWord ? query.keyWord : '';

    const data = await this.blogs
      .createQueryBuilder('blogs')
      .leftJoinAndSelect(Users, 'users', 'blogs.creator = users.id')
      .select(
        `
          blogs.title as title,
          blogs.coverUrl as coverUrl,
          blogs.summary as summary,
          blogs.status as status,
          blogs.createTime as createTime,
          users.usercode as usercode,
          users.username as username,
          users.avatar as avatar,
      `,
      )
      .where('blogs.title LIKE :keyWord', { keyWord: `%${keyWord}%` })
      .orderBy('blogs.createTime', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getRawMany();

    const total = await this.blogs.count({
      where: {
        title: Like(`%${keyWord}%`),
      },
    });
    return {
      data,
      total,
    };
  }

  async getBlogDetail(params) {
    return this.blogs
      .createQueryBuilder('blogs')
      .where('blogs.id = :id', { id: params.id })
      .addSelect('blogs.content')
      .getOne();
  }
}
