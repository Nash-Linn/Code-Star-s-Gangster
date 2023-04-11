import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Req,
  UploadedFile,
  Res,
  StreamableFile,
  Header,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateInfo(updateUserDto);
  }

  @Post('updateAvatar')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  updateAvatar(
    @Req() req,
    @Body('usercode') usercode: string,
    @UploadedFile() file,
  ) {
    return this.usersService.updateAvatar(req.user.usercode, file);
  }

  @Get('getAvatar/:filename')
  @Header('Content-Type', 'application/octet-stream;charset=utf-8')
  getAvatar(@Res() res: Response, @Param() param) {
    return this.usersService.getAvatar(res, param.filename);
  }

  @Get('getUserInfo')
  @UseGuards(AuthGuard('jwt'))
  getUserInfo(@Req() req) {
    return this.usersService.getUserInfo(req.user.usercode);
  }
}
