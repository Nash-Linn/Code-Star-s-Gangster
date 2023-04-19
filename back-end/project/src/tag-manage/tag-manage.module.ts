import { Module } from '@nestjs/common';
import { TagManageService } from './tag-manage.service';
import { TagManageController } from './tag-manage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTags } from './entities/blog-tags.entity';
import { TagType } from './entities/tag-type.entity';
import { MergeBlogsTags } from './entities/merge-blogs-tags.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [BlogTags, TagType, MergeBlogsTags],
      'cs_gangster',
    ),
  ],
  controllers: [TagManageController],
  providers: [TagManageService],
  exports: [TagManageService],
})
export class TagManageModule {}
