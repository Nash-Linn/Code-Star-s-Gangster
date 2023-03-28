import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { databaseConf } from './common/database';
import { AuthModule } from './auth/auth.module';
import { BlogsManageModule } from './blogs-manage/blogs-manage.module';

@Module({
  imports: [UsersModule, ...databaseConf(), AuthModule, BlogsManageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
