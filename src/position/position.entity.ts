import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { QuizEntity } from '../quiz/quiz.entity';

@Entity({ name: 'positions' })
export class PositionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => QuizEntity, (quiz) => quiz.position, { onUpdate: 'CASCADE' })
  quiz: QuizEntity[];
}
