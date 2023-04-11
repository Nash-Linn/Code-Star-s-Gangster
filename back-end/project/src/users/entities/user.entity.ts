import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Blogs } from 'src/blogs-manage/entities/blogs-manage.entity';

@Entity()
export class Users {
  @Generated('uuid')
  uuid: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false, comment: '昵称' })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false, comment: '账号' })
  usercode: string;

  @Exclude()
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    select: false,
    comment: '密码',
  })
  password: string;

  @Column({ type: 'varchar', length: 255, comment: '头像' })
  avatar: string;

  @Column({ type: 'varchar', length: 1, comment: '性别' })
  gender: string;

  @Column({ type: 'varchar', length: 255, comment: '简介' })
  intro: string;

  @Column({ select: false, comment: '角色' })
  roles: string;

  @CreateDateColumn({ select: false, type: 'timestamp', comment: '创建时间' })
  createTime: Date;
}
