import { Module } from '@nestjs/common';
import { BlogsManageService } from './blogs-manage.service';
import { BlogsManageController } from './blogs-manage.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import env from '../config/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blogs } from './entities/blogs-manage.entity';
import { BlogTags } from './entities/blog-tags.entity';
import { Users } from 'src/users/entities/user.entity';
const fileDir = env.staticDir + '/blog_images/';
@Module({
  imports: [TypeOrmModule.forFeature([Blogs, BlogTags, Users], 'cs_gangster')],

  controllers: [BlogsManageController],
  providers: [
    BlogsManageService,
    {
      provide: 'fileDir',
      useValue: fileDir,
    },
  ],
})
export class BlogsManageModule {}
