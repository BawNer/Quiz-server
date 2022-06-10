import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'quiz' })
export class QuizEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  link: string;

  @Column()
  title: string;

  @Column({ type: 'simple-json', default: null })
  questions: {
    title: string;
    answers: {
      label: string;
      isTrue: boolean;
    };
  }[];

  @Column({ default: 'active' })
  status: string;
}
