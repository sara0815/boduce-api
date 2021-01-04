import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlateDto {
  @IsString()
  readonly name: string;
  @IsString({ each: true })
  @IsOptional()
  readonly tags: string[];
}
