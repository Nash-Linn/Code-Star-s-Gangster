import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Blogs } from './entities/blogs-manage.entity';
import { Users } from 'src/users/entities/user.entity';
import { dealFileNameAddDate, ftpGetFile, ftpPutFile } from 'src/utils/ftp';
import { join } from 'path';
import { getFileFromMinio, putFileToMinio } from 'src/utils/minio';
@Injectable()
export class BlogsManageService {
  constructor(
    @InjectRepository(Blogs, 'cs_gangster')
    private readonly blogs: Repository<Blogs>,
  ) {}

  async uploadImage(usercode: string, file: any) {
    return new Promise((resolve, reject) => {
      const fileName = dealFileNameAddDate(file);
      const filePath = join('blog_images', usercode, fileName);
      putFileToMinio(file, 'code-star-gangster', filePath)
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
    const filePath = join('blog_images', usercode, filename);
    getFileFromMinio(response, 'code-star-gangster', filePath);
  }

  async getCover(response, filename) {
    const filePath = join('blog_cover', filename);
    getFileFromMinio(response, 'code-star-gangster', filePath);
  }

  async create(req, file, body) {
    const data = new Blogs();
    data.creator = req.user.id;

    data.title = body.title;
    data.summary = body.summary;
    data.content = body.content;
    if (file) {
      const fileName = dealFileNameAddDate(file);
      const filePath = join('blog_cover', fileName);
      putFileToMinio(file, 'code-star-gangster', filePath);
      data.coverUrl = fileName;
    }
    const res = await this.blogs.save(data);
    return {
      id: res.id,
    };
  }

  async update(file, body) {
    const data = new Blogs();
    data.title = body.title;
    data.summary = body.summary;
    data.content = body.content;
    if (file) {
      const fileName = dealFileNameAddDate(file);
      const filePath = join('blog_cover', fileName);
      putFileToMinio(file, 'code-star-gangster', filePath);
      data.coverUrl = fileName;
    }
    await this.blogs
      .createQueryBuilder('blogs')
      .update()
      .set(data)
      .where('id = :id', { id: body.id })
      .execute();

    return {
      id: body.id,
    };
  }

  async logicDelete(id) {
    await this.blogs
      .createQueryBuilder('blogs')
      .update()
      .set({ status: 0 })
      .where('id = :id', { id: id })
      .execute();

    return {
      id: id,
    };
  }

  async getBlogList(query: {
    keyword: string;
    page: number;
    pageSize: number;
  }) {
    const page = query.page ? query.page : 1;
    const pageSize = query.pageSize ? query.pageSize : 10;
    const keyword = query.keyword ? query.keyword : '';
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
      .where('blogs.status = :status', { status: 1 })
      .andWhere('blogs.title LIKE :keyword', { keyword: `%${keyword}%` })
      .orderBy('blogs.createTime', 'DESC')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .getRawMany();

    const total = await this.blogs.count({
      where: {
        title: Like(`%${keyword}%`),
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
      keyword: string;
      page: number;
      pageSize: number;
    },
  ) {
    const page = query.page ? query.page : 1;
    const pageSize = query.pageSize ? query.pageSize : 10;
    const keyword = query.keyword ? query.keyword : '';

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
      .andWhere('blogs.status = :status', { status: 1 })
      .andWhere('blogs.title LIKE :keyword', { keyword: `%${keyword}%` })
      .orderBy('blogs.createTime', 'DESC')
      .offset((page - 1) * pageSize)
      .limit(pageSize)
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
      .where('blogs.status = :status', { status: 1 })
      .andWhere('blogs.id = :id', { id: params.id })
      .getRawOne();
  }
}
