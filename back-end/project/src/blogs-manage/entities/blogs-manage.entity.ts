import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { BlogTags } from './blog-tags.entity';

@Entity()
export class Blogs {
  @Generated('uuid')
  uuid: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  creator: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  coverUrl: string;

  @Column({ type: 'varchar', length: 255 })
  summary: string;

  @Column({ type: 'text' })
  content: string;

  @OneToMany(() => BlogTags, (tags) => tags.blogId)
  tags: BlogTags[];

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
}
