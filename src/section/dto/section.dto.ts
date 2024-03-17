import { Optional } from '@nestjs/common';
import { IsString, IsNotEmpty, Length, IsInt, Min, Max } from 'class-validator';

export class CreateSectionDTO {
  @IsNotEmpty({ message: 'sectionName is required' })
  @Length(1, 100, {
    message: 'sectionName length must be between 1 and 100 characters',
  })
  @IsString({ message: 'sectionName must be a string' })
  sectionName: string;
}
export class UpdateSectionDto {
  @IsNotEmpty({ message: 'sectionName is required' })
  @Length(1, 100, {
    message: 'sectionName length must be between 1 and 100 characters',
  })
  @IsString({ message: 'sectionName must be a string' })
  sectionName: string;
}
