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

export class CreateAssignmentDTO {
  @IsNotEmpty({ message: 'title is required' })
  @Length(1, 200, {
    message: 'title length must be between 1 and 100 characters',
  })
  @IsString({ message: 'title must be a string' })
  title: string;


  @IsDateString({}, { message: 'dateUploaded must be a valid date' })
  @IsNotEmpty({ message: 'dateUploaded is required' })
  dateUploaded: Date;

  @IsNotEmpty({ message: 'dateUploaded is required' })
  assignmentFile: string;
}

