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
}
