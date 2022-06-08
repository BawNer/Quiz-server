import { IsNotEmpty } from 'class-validator';

export class UpdateInterviewerDto {
  @IsNotEmpty()
  readonly results: object;
}
