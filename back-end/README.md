# Code Star's Gangster

## 创建 nest

nest new nestjs-demo

## 解决跨域

npm install cors
npm install @types/cors -D



在mian.ts中引入

```
import * as cors from 'cors';

app.use(cors());
```



## 新建模块

nest g res moduleName

## 文件上传 的两个包

npm install multer @nestjs/platform-express （nestjs 自带）
npm install multer @types/multer

## 用流的形式导出文件

npm install compressing
使用 zip 方法进行压缩



## 安装 TypeORM

用于操作数据

npm install --save @nestjs/typeorm typeorm mysql2



在app.module.ts 中引入

```typescript
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forRoot({
      name: 'databasename',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'database',
      username: 'username',
      password: 'password',
      retryDelay: 500, //重试时间间隔
      retryAttempts: 10, //重试次数
      synchronize: true, //自动将实体类同步到数据库
      autoLoadEntities: true, //自动加载实体
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
})
```

创建entity

```typescript
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @Generated('uuid')
  uuid: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  usercode: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  avatar: string;

  @Column({ type: 'varchar', length: 255 })
  desc: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
}

```

在需要用到的模块引入

```typescript
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Users], 'databasename')],
})
```

在 severvice   层使用

```typescript
import { Injectable } from '@nestjs/common';、
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class UsersService {
   constructor(
    @InjectRepository(Users, 'databasename')
    private readonly users: Repository<Users>,
  ) {}
    
  findAll() {
    return this.users.find();
  }  
}
```





## 返回指定字段

    const fields: FindOptionsSelect<Account> = {
        accountType: true
    };
    const list: Account[] = await this.repo.createQueryBuilder('a').setFindOptions({select: fields}).getMany();
    // 这样listt每个记录，只有一个accountType字段



