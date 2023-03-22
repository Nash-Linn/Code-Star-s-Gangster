import { TypeOrmModule } from '@nestjs/typeorm';
import key from './databaseKey'; //用于存储数据库密码

export function databaseConf() {
  const conf = [
    TypeOrmModule.forRoot({
      name: 'cs_gangster',
      type: 'mysql',
      host: '101.34.111.220',
      port: 3306,
      database: 'cs_gangster',
      username: 'cs_gangster',
      password: key.cs_gangster,
      retryDelay: 500, //重试时间间隔
      retryAttempts: 10, //重试次数
      synchronize: true, //自动将实体类同步到数据库
      autoLoadEntities: true, //自动加载实体
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ];

  return conf;
}
