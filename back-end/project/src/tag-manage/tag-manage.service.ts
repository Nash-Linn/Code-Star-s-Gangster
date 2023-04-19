import { MergeBlogsTags } from './entities/merge-blogs-tags.entity';
import { Injectable } from '@nestjs/common';
import { CreateTagManageDto } from './dto/create-tag-manage.dto';
import { UpdateTagManageDto } from './dto/update-tag-manage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TagType } from './entities/tag-type.entity';
import { Repository } from 'typeorm';
import { BlogTags } from './entities/blog-tags.entity';

@Injectable()
export class TagManageService {
  constructor(
    @InjectRepository(TagType, 'cs_gangster')
    private readonly tagType: Repository<TagType>,
    @InjectRepository(BlogTags, 'cs_gangster')
    private readonly blogTags: Repository<BlogTags>,
    @InjectRepository(MergeBlogsTags, 'cs_gangster')
    private readonly mergeBlogsTags: Repository<MergeBlogsTags>,
  ) {}

  getTagList() {
    return this.tagType.find();
  }

  getTags(typeId: string) {
    return this.blogTags.find({
      where: {
        typeId: typeId,
      },
    });
  }

  async getTag(id) {
    return await this.blogTags.findOne({
      where: {
        id: id,
      },
    });
  }

  async bindBlogTag(blogId, tags) {
    if (!tags) {
      return;
    }
    await this.mergeBlogsTags
      .createQueryBuilder()
      .delete()
      .from(MergeBlogsTags)
      .where('blogId = :id', { id: blogId })
      .execute();

    const tagArr = JSON.parse(tags);
    for (const item of tagArr) {
      const blogsTags = new MergeBlogsTags();
      blogsTags.blogId = blogId;
      blogsTags.tagId = item;
      await this.mergeBlogsTags.save(blogsTags);
    }
  }
}
