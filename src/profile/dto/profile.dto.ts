import { Optional } from '@nestjs/common';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsInt,
  Min,
  Max,
  IsDateString,
  IsArray,
} from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty({ message: 'biography is required' })
  @Length(1, 2000, {
    message: 'biography length must be between 1 and 2000 characters',
  })
  @IsString({ message: 'biography must be a string' })
  biography: string;

  @IsNotEmpty({ message: 'researchInterests is required' })
  @Length(1, 1000, {
    message: 'researchInterests length must be between 1 and 5000 characters',
  })
  @IsString({ message: 'researchInterests must be a string' })
  researchInterests: string[];
}

export class UpdateProfileDto {
  @IsNotEmpty({ message: 'biography is required' })
  @Length(1, 2000, {
    message: 'biography length must be between 1 and 2000 characters',
  })
  @IsString({ message: 'biography must be a string' })
  biography: string;

  @IsNotEmpty({ message: 'researchInterests is required' })
  @Length(1, 1000, {
    message: 'researchInterests length must be between 1 and 5000 characters',
  })
  @IsString({ message: 'researchInterests must be a string' })
  researchInterests: string[];
}
