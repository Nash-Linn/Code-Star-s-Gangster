import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Blogs } from './blogs-manage.entity';
@Entity()
export class BlogTags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Blogs, (blog) => blog.id)
  blogId: Blogs;
}
