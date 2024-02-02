import { MergeBlogsTags } from './entities/merge-blogs-tags.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  // 根据类别id获取标签所有字段
  getTags(typeId: number) {
    return this.blogTags.find({
      where: {
        typeId: typeId,
      },
    });
  }

  // 获取标签详情
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

  getBlogTag(blogId) {
    return this.mergeBlogsTags
      .createQueryBuilder('mergeBlogsTags')
      .leftJoinAndSelect(
        BlogTags,
        'blogTags',
        'blogTags.id = mergeBlogsTags.tagId',
      )
      .select(
        `
        blogTags.id,
        blogTags.name,
        blogTags.typeId
        `,
      )
      .where('mergeBlogsTags.blogId = :blogId', { blogId: blogId })
      .getRawMany();
  }

  async addTag(isNewType, tagType, tag) {
    let tagTypeId;
    if (isNewType) {
      const tagTypeData = new TagType();
      tagTypeData.name = tagType;
      const newTagType = await this.tagType.save(tagTypeData);
      tagTypeId = newTagType.id;
    } else {
      tagTypeId = tagType;
      const tagInfo = await this.blogTags.find({
        where: {
          name: tag,
          typeId: tagType,
        },
      });
      if (tagInfo.length > 0) {
        throw new HttpException(
          '当前类别下已存在该标签',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const tagData = new BlogTags();
    tagData.name = tag;
    tagData.typeId = tagTypeId;
    const newTag = this.blogTags.save(tagData);
    return newTag;
  }
}
