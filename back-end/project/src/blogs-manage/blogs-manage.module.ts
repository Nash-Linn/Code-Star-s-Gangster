import { Module } from '@nestjs/common';
import { BlogsManageService } from './blogs-manage.service';
import { BlogsManageController } from './blogs-manage.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import env from '../config/env';
console.log('env.staticDir', env.staticDir);
const fileDir = env.staticDir + '\\blog_images\\';

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
  ],

  controllers: [BlogsManageController],
  providers: [
    BlogsManageService,
    {
      provide: 'fileDir',
      useValue: fileDir,
    },
  ],
})
export class BlogsManageModule {}
