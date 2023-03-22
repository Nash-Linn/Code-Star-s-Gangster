import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

import { databaseConf } from './common/database';

@Module({
  imports: [UsersModule, ...databaseConf()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
