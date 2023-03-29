import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import {
  FilesInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express/multer';
import { Response } from 'express';
import { BlogsManageService } from './blogs-manage.service';
import { CreateBlogsManageDto } from './dto/create-blogs-manage.dto';
import { UpdateBlogsManageDto } from './dto/update-blogs-manage.dto';
import envConfig from 'src/config/env';

import { normalize } from 'path';
import { AuthGuard } from '@nestjs/passport';

@Controller('blogsManage')
export class BlogsManageController {
  constructor(private readonly blogsManageService: BlogsManageService) {}

  @Post('uploadfile')
  @UseInterceptors(FileInterceptor('file')) //用于处理文件
  upload(@UploadedFile() file) {
    return {
      errno: 0, // 注意：值是数字，不能是字符串
      data: {
        url: envConfig.baseURL + 'static/blog_images/' + file.filename, // 图片 src ，必须
        alt: '', // 图片描述文字，非必须
        href: 'static/blog_images/' + file.filename, // 图片的链接，非必须
      },
    };
  }

  @Get('image/:url')
  getImage(@Res() res: Response, @Param() params) {
    console.log('params', params);
    return this.blogsManageService.getImage(res, params);
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file, @Request() req, @Body() body) {
    return this.blogsManageService.create(req, file, body);
  }

  @Get('/getList')
  getList(@Query() query: { keyWord: string; page: number; pageSize: number }) {
    return this.blogsManageService.getBlogList(query);
  }
}
