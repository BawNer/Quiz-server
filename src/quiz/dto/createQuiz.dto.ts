import { IsNotEmpty } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly position: number;

  @IsNotEmpty()
  readonly questions: {
    title: string;
    answers: {
      label: string;
      isTrue: boolean;
    }[];
  }[];
}
