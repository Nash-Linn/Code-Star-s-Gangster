import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class Users {
  @Generated('uuid')
  uuid: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, comment: '用户名' })
  username: string;

  @Column({ type: 'varchar', length: 255, comment: '账号' })
  usercode: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255, select: false, comment: '密码' })
  password: string;

  @Column({ type: 'varchar', length: 255, comment: '头像' })
  avatar: string;

  @Column({ type: 'varchar', length: 255, comment: '备注' })
  desc: string;

  @Column({ comment: '角色' })
  roles: string;

  @CreateDateColumn({ type: 'timestamp', comment: '创建时间' })
  createTime: Date;
}
