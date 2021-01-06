import { IsString } from 'class-validator';

export class CreateVisitDto {
  @IsString()
  date: string;
}
