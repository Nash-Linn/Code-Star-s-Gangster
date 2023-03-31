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
    data.creator = req.user.usercode;
    data.creatorString = req.user.username;
    data.title = body.title;
    data.summary = body.summary;
    data.content = body.content;
    data.status = 1;
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
    const data = await this.blogs.find({
      where: {
        title: Like(`%${keyWord}%`),
        status: 1,
      },
      order: {
        createTime: 'DESC',
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
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
