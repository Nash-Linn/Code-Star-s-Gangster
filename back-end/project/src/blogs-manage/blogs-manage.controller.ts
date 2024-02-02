import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Res,
  UseGuards,
  Request,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { Response } from 'express';
import { BlogsManageService } from './blogs-manage.service';

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

  @Get('cover/:filename')
  getCover(@Res() res: Response, @Param() params) {
    return this.blogsManageService.getCover(res, params.filename);
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file, @Request() req, @Body() body) {
    return this.blogsManageService.create(req, file, body);
  }
  @Post('update')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  update(@UploadedFile() file, @Body() body) {
    return this.blogsManageService.update(file, body);
  }

  @Get('delete/:id')
  logicDelete(@Param() params) {
    return this.blogsManageService.logicDelete(params.id);
  }

  @Get('getList')
  getList(
    @Query()
    query: {
      keyword: string;
      page: number;
      pageSize: number;
      tagId: number;
      typeId: number;
    },
  ) {
    return this.blogsManageService.getBlogList(query);
  }

  @Get('getMyBlogList')
  @UseGuards(AuthGuard('jwt'))
  getMyBlogList(
    @Request() req,
    @Query() query: { keyword: string; page: number; pageSize: number },
  ) {
    return this.blogsManageService.getMyBlogList(req, query);
  }

  @Get('getBlogDetail/:id')
  getBlogDetail(@Param() params) {
    return this.blogsManageService.getBlogDetail(params);
  }
}
