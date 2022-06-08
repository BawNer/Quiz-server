import { IsNotEmpty } from 'class-validator';

export class CreatePositionDto {
  @IsNotEmpty()
  readonly name: string;
}