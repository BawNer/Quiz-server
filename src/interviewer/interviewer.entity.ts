import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

@Entity('interviewers')
export class InterviewerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quiz: number;

  @Column()
  bio: string;

  @Column()
  email: string;

  @Column({ default: false })
  isEmailActive: boolean;

  @Column({ default: null })
  activationCode: string;

  @Column({ default: null })
  phone: string;

  @Column({ type: 'simple-json', default: null })
  results: {
    title: string;
    questions: {
      label: string;
      isAnswerRight: boolean;
      userAnswerThis: boolean;
    }[];
    isAnswerRight: boolean;
  }[];

  @Column({ default: '' })
  link: string;

  @BeforeInsert()
  async generateLink() {
    this.link = `${process.env.SERVER_PROTOCOL}://${
      process.env.SERVER_NAME
    }/join/result/${await uuid()}`;
  }
}
