import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { databaseConf } from './common/database';
import { AuthModule } from './auth/auth.module';
import { BlogsManageModule } from './blogs-manage/blogs-manage.module';
import { TagManageModule } from './tag-manage/tag-manage.module';
@Module({
  imports: [
    ...databaseConf(),
    UsersModule,
    AuthModule,
    BlogsManageModule,
    TagManageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
