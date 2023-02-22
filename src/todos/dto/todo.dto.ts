import { IsNumberString } from 'class-validator';

export class TodoDto {
  @IsNumberString()
  id: number;
}
