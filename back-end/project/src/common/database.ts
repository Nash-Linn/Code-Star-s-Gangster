import { TypeOrmModule } from '@nestjs/typeorm';
import { datebaseKey } from '../config/keys'; //用于存储数据库密码

import env from '../config/env';
export function databaseConf() {
  const conf = [
    TypeOrmModule.forRoot({
      name: 'cs_gangster',
      type: 'mysql',
      host: env.ip,
      port: 3306,
      database: 'cs_gangster',
      username: 'cs_gangster',
      password: datebaseKey.cs_gangster,
      retryDelay: 500, //重试时间间隔
      retryAttempts: 10, //重试次数
      synchronize: false, //自动将实体类同步到数据库
      autoLoadEntities: true, //自动加载实体
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ];

  return conf;
}
