import { Module } from '@nestjs/common';
import { BlogsManageService } from './blogs-manage.service';
import { BlogsManageController } from './blogs-manage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blogs } from './entities/blogs-manage.entity';
import { Users } from 'src/users/entities/user.entity';
import { TagManageModule } from 'src/tag-manage/tag-manage.module';
import { BlogTags } from 'src/tag-manage/entities/blog-tags.entity';
import { MergeBlogsTags } from 'src/tag-manage/entities/merge-blogs-tags.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Blogs, Users, BlogTags, MergeBlogsTags],
      'cs_gangster',
    ),
    TagManageModule,
  ],

  controllers: [BlogsManageController],
  providers: [BlogsManageService],
})
export class BlogsManageModule {}
