import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
@Entity()
export class BlogTags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  typeId: string;
}
