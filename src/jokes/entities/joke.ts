import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Joke {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  setup: string;

  @Column()
  punchline: string;

  @Column()
  type: string;

  @Column({ default: 'Anonymous' })
  author: string;
}
