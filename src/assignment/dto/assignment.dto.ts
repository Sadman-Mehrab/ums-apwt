import {
  IsString,
  IsNotEmpty,
  Length,
  IsDateString,
  IsOptional
} from 'class-validator';

export class CreateAssignmentDTO {
  @IsNotEmpty({ message: 'Title is required' })
  @Length(1, 200, {
    message: 'Title length must be between 1 and 100 characters',
  })
  @IsString({ message: 'Title must be a string' })
  title: string;


  @IsDateString({}, { message: 'Uploaded Date must be a valid date' })
  @IsNotEmpty({ message: 'Uploaded Date is required' })
  uploadedDate: Date;

  @IsOptional()
  assignmentFile: string;
}

export class GetAssignmentDTO{
  assignmentId: number;
  title: string;
  uploadedDate: Date;
  assignmentFile: string;
}
