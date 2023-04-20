import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TagManageService } from './tag-manage.service';
import { CreateTagManageDto } from './dto/create-tag-manage.dto';
import { UpdateTagManageDto } from './dto/update-tag-manage.dto';

@Controller('tagManage')
export class TagManageController {
  constructor(private readonly tagManageService: TagManageService) {}

  @Get('tagType')
  getTagList() {
    return this.tagManageService.getTagList();
  }

  @Get('tag/:typeId')
  getTags(@Param() param) {
    return this.tagManageService.getTags(param.typeId);
  }

  @Get('blogTag/:blogId')
  getBlogTags(@Param() param) {
    return this.tagManageService.getBlogTag(param.blogId);
  }
}
