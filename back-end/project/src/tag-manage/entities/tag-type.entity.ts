import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class TagType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
