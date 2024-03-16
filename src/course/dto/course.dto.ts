import { Optional } from '@nestjs/common';
import { IsString, IsNotEmpty, Length, IsInt, Min, Max } from 'class-validator';

export class CreateCourseDTO {
  @IsNotEmpty({ message: 'courseName is required' })
  @Length(1, 100, {
    message: 'courseName length must be between 8 and 100 characters',
  })
  @IsString({ message: 'courseName must be a string' })
  courseName: string;

  @IsNotEmpty({ message: 'department is required' })
  @Length(1, 100, {
    message: 'department length must be between 8 and 100 characters',
  })
  @IsString({ message: 'department must be a string' })
  department: string;

  @IsNotEmpty({ message: 'credit is required' })
  @Min(1, {message: 'credit must be greater than or equal to 1'})
  @Max(3, {message: 'credit must be less than or equal to 3'})
  @IsInt({ message: 'credit must be a number' })
  credit: number;


}


export class UpdateCourseDTO {
  @IsNotEmpty({ message: 'courseName is required' })
  @Length(1, 100, {
    message: 'courseName length must be between 8 and 100 characters',
  })
  @IsString({ message: 'courseName must be a string' })
  courseName: string;

  @IsNotEmpty({ message: 'department is required' })
  @Length(1, 100, {
    message: 'department length must be between 8 and 100 characters',
  })
  @IsString({ message: 'department must be a string' })
  department: string;

  @IsNotEmpty({ message: 'credit is required' })
  @Min(1, {message: 'credit must be greater than or equal to 1'})
  @Max(3, {message: 'credit must be less than or equal to 3'})
  @IsInt({ message: 'credit must be a number' })
  credit: number;


}