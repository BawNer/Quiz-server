import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateInterviewerDto {
  @IsNotEmpty()
  readonly bio: string;

  @IsNotEmpty()
  readonly quiz: number;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly phone: string;
}
