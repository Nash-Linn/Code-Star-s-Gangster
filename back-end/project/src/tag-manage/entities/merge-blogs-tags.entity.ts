import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MergeBlogsTags {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blogId: number;

  @Column()
  tagId: number;
}
