import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from '../user/user.entity';
import { PositionEntity } from '../position/position.entity';
import { InterviewerEntity } from '../interviewer/interviewer.entity';

@Entity({ name: 'quiz' })
export class QuizEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  link: string;

  @BeforeInsert()
  async generateLink() {
    this.link = `/join/quiz/${await uuid()}`;
  }

  @Column()
  title: string;

  @Column({ type: 'simple-json', default: null })
  questions: {
    title: string;
    answers: {
      label: string;
      isTrue: boolean;
    }[];
  }[];

  @Column({ default: 'active' })
  status: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  author: UserEntity;

  @ManyToOne(() => PositionEntity, (position) => position.id)
  position: PositionEntity;

  @OneToMany(() => InterviewerEntity, (interviewer) => interviewer.quiz, { onDelete: 'CASCADE' })
  interviewers: InterviewerEntity[];
}
