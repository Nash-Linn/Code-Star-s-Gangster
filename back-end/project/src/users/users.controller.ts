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
} from '@nestjs/common';
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
  @UseInterceptors(FileInterceptor('file'))
  updateAvatar(@Body('usercode') usercode: string, @UploadedFile() file) {
    return this.usersService.updateAvatar(usercode, file);
  }

  @Get('getUserInfo')
  @UseGuards(AuthGuard('jwt'))
  getUserInfo(@Req() req) {
    console.log('req', req.user);
    return this.usersService.getUserInfo(req.user.usercode);
  }
}
