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

  @Column({ type: 'varchar', length: 255 })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  usercode: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  avatar: string;

  @Column({ type: 'varchar', length: 255 })
  desc: string;

  @Column()
  roles: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
}
