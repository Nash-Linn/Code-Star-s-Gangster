import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import env from '../config/env';
import { extname, join } from 'path';

const fileDir = join(env.staticDir, 'avatars');
console.log('fileDir', fileDir);
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: fileDir,
        filename: (req, file, callback) => {
          const name = file.originalname.split('.')[0];
          const fileName = `${
            name + '(' + new Date().getTime() + ')' + extname(file.originalname)
          }`;
          return callback(null, fileName);
        },
      }),
    }),
    TypeOrmModule.forFeature([Users], 'cs_gangster'),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
