import { IsString } from 'class-validator';

export class CreatePlateDto {
  @IsString()
  readonly name: string;
}
