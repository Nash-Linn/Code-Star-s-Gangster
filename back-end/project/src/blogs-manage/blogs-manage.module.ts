import { Module } from '@nestjs/common';
import { BlogsManageService } from './blogs-manage.service';
import { BlogsManageController } from './blogs-manage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blogs } from './entities/blogs-manage.entity';
import { BlogTags } from './entities/blog-tags.entity';
import { Users } from 'src/users/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Blogs, BlogTags, Users], 'cs_gangster')],

  controllers: [BlogsManageController],
  providers: [BlogsManageService],
})
export class BlogsManageModule {}
