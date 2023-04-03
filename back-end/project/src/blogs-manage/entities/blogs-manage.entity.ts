import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { BlogTags } from './blog-tags.entity';
import { Users } from 'src/users/entities/user.entity';
@Entity()
export class Blogs {
  @Generated('uuid')
  uuid: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, comment: '作者账号' })
  creator: string;

  @Column({ type: 'varchar', length: 20, comment: '作者用户名' })
  creatorString: string;

  @Column({ type: 'varchar', comment: '作者头像' })
  creatorAvatar: string;

  @Column({ type: 'varchar', length: 255, comment: '文章标题' })
  title: string;

  @Column({ type: 'varchar', length: 255, comment: '封面路径' })
  coverUrl: string;

  @Column({ type: 'varchar', length: 255, comment: '摘要' })
  summary: string;

  @Exclude()
  @Column({ type: 'text', select: false, comment: '文章正文' })
  content: string;

  @Column({ type: 'varchar', length: 1, default: 1, comment: '状态' })
  status: number;

  @CreateDateColumn({ type: 'timestamp', comment: '创建时间' })
  createTime: Date;

  @OneToMany(() => BlogTags, (tags) => tags.blogId)
  tags: BlogTags[];
}
