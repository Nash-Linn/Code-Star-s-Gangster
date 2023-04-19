import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Blogs } from 'src/blogs-manage/entities/blogs-manage.entity';
@Entity()
export class BlogTags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  typeId: string;
}
