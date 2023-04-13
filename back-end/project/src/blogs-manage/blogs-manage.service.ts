import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Blogs } from './entities/blogs-manage.entity';
import { Users } from 'src/users/entities/user.entity';
import { dealFileNameAddDate, ftpGetFile, ftpPutFile } from 'src/utils/ftp';
import { join } from 'path';
@Injectable()
export class BlogsManageService {
  constructor(
    @InjectRepository(Blogs, 'cs_gangster')
    private readonly blogs: Repository<Blogs>,
  ) {}

  async uploadImage(usercode: string, file: any) {
    return new Promise((resolve, reject) => {
      const fileName = dealFileNameAddDate(file);
      ftpPutFile(file, `/static/blog_images/${usercode}/${fileName}`)
        .then((res: any) => {
          if (res.success) {
            resolve({
              errno: 0, // 注意：值是数字，不能是字符串
              data: {
                url: fileName, // 图片 src ，必须
                alt: '', // 图片描述文字，非必须
                href: fileName, // 图片的链接，非必须
              },
            });
          }
        })
        .catch(() => {
          reject({
            errno: 1, // 注意：值是数字，不能是字符串
          });
        });
    });
  }

  async getImage(response, usercode, filename) {
    const filePath = join('static', 'blog_images', usercode, filename);
    await ftpGetFile(filePath, response);
  }

  async getCover(response, filename) {
    const filePath = join('static', 'blog_cover', filename);
    await ftpGetFile(filePath, response);
  }

  async create(req, file, body) {
    const data = new Blogs();
    data.creator = req.user.id;

    data.title = body.title;
    data.summary = body.summary;
    data.content = body.content;
    if (file) {
      const fileName = dealFileNameAddDate(file);
      ftpPutFile(file, `/static/blog_cover/${fileName}`);
      data.coverUrl = fileName;
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
          blogs.id,
          blogs.title,
          blogs.coverUrl,
          blogs.summary,
          blogs.status,
          blogs.createTime,
          users.usercode as creatorCode,
          users.username as creatorName,
          users.avatar as creatorAvatar
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

  async getMyBlogList(
    req,
    query: {
      keyWord: string;
      page: number;
      pageSize: number;
    },
  ) {
    const page = query.page ? query.page : 1;
    const pageSize = query.pageSize ? query.pageSize : 10;
    const keyWord = query.keyWord ? query.keyWord : '';

    const data = await this.blogs
      .createQueryBuilder('blogs')
      .leftJoinAndSelect(Users, 'users', 'blogs.creator = users.id')
      .select(
        `
          blogs.id,
          blogs.title,
          blogs.coverUrl,
          blogs.summary,
          blogs.status,
          blogs.createTime,
          users.usercode as creatorCode,
          users.username as creatorName,
          users.avatar as creatorAvatar
      `,
      )
      .where('blogs.creatorId = :creatorId', { creatorId: req.user.id })
      .andWhere('blogs.title LIKE :keyWord', { keyWord: `%${keyWord}%` })
      .orderBy('blogs.createTime', 'DESC')
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getRawMany();

    const total = await this.blogs
      .createQueryBuilder('blogs')
      .where('blogs.creatorId = :creatorId', { creatorId: req.user.id })
      .getCount();
    return {
      data,
      total,
    };
  }

  async getBlogDetail(params) {
    return this.blogs
      .createQueryBuilder('blogs')
      .leftJoinAndSelect(Users, 'users', 'blogs.creator = users.id')
      .select(
        `
          blogs.*,
          users.usercode as creatorCode,
          users.username as creatorName,
          users.avatar as creatorAvatar
      `,
      )
      .where('blogs.id = :id', { id: params.id })
      .getRawOne();
  }
}
