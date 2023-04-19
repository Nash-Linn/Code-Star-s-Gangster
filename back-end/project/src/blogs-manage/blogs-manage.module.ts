import { Module } from '@nestjs/common';
import { BlogsManageService } from './blogs-manage.service';
import { BlogsManageController } from './blogs-manage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blogs } from './entities/blogs-manage.entity';
import { Users } from 'src/users/entities/user.entity';
import { TagManageModule } from 'src/tag-manage/tag-manage.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Blogs, Users], 'cs_gangster'),
    TagManageModule,
  ],

  controllers: [BlogsManageController],
  providers: [BlogsManageService],
})
export class BlogsManageModule {}
