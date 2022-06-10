import { QuizEntity } from '../quiz.entity';

export type QuizType = Omit<QuizEntity, 'generateLink'>;
