import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity({ name: 'quiz' })
export class QuizEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  link: string;

  @BeforeInsert()
  async generateLink() {
    this.link = `${process.env.SERVER_PROTOCOL}://${
      process.env.SERVER_NAME
    }/join/quiz/${await uuid()}`;
  }

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
