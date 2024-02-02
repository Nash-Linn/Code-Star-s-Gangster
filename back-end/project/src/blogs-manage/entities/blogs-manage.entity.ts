import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Users } from 'src/users/entities/user.entity';
import { BlogTags } from 'src/tag-manage/entities/blog-tags.entity';
@Entity()
export class Blogs {
  @Generated('uuid')
  uuid: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, comment: '文章标题' })
  title: string;

  @Column({ type: 'varchar', length: 255, comment: '封面路径' })
  coverUrl: string;

  @Column({ type: 'varchar', length: 255, comment: '摘要' })
  summary: string;

  @Exclude()
  @Column({ type: 'longtext', comment: '文章正文' })
  content: string;

  @Column({ type: 'varchar', length: 1, default: 1, comment: '状态' })
  status: number;

  @CreateDateColumn({ type: 'timestamp', comment: '创建时间' })
  createTime: Date;

  @ManyToOne(() => Users, (users) => users.id, {
    cascade: true,
  })
  @JoinColumn({ name: 'creatorId' })
  creator: Users;
}
