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
  HttpStatus,
  HttpException,
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
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file')) //用于处理文件
  async upload(@Request() req, @UploadedFile() file) {
    const res = await this.blogsManageService.uploadImage(
      req.user.usercode,
      file,
    );
    return res;
  }

  @Get('image/:usercode/:filename')
  getImage(@Res() res: Response, @Param() params) {
    return this.blogsManageService.getImage(
      res,
      params.usercode,
      params.filename,
    );
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

  @Get('/getBlogDetail/:id')
  getBlogDetail(@Param() params) {
    return this.blogsManageService.getBlogDetail(params);
  }
}
