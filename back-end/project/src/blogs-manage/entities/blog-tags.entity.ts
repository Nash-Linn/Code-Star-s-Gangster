import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Blogs } from './blogs-manage.entity';
@Entity()
export class BlogTags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Blogs, (blog) => blog.id)
  @JoinColumn({ name: 'blogId' })
  blogId: Blogs;
}
