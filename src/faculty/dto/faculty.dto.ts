import { Optional } from '@nestjs/common';
import {
  IsString,
  Matches,
  IsNotEmpty,
  Length,
  IsEmail,
  IsDateString,

} from 'class-validator';

export class CreateFacultyDto {
  @IsNotEmpty({ message: 'userName is required' })
  @Length(8, 100, {
    message: 'userName length must be between 8 and 100 characters',
  })
  @IsString({ message: 'userName must be a string' })
  userName: string;

  @IsEmail({}, { message: 'email must be valid' })
  @IsNotEmpty({ message: 'email is required.' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Passwords must be at least 8 characters, should include atleast one uppercase and one lowercase letter and a special character and a digit',
  })
  password: string;

  @IsNotEmpty({ message: 'fullName is required' })
  @Length(8, 100, {
    message: 'fullName length must be between 8 and 100 characters',
  })
  @IsString({ message: 'fullName must be a string' })
  fullName: string;

  @IsNotEmpty({ message: 'dateOfBirth is required' })
  @IsDateString({}, { message: 'dateOfBirth must be a valid date' })
  dateOfBirth: Date;

  @IsNotEmpty({ message: 'joiningDate is required' })
  @IsDateString({}, { message: 'joiningDate must be a valid date' })
  joiningDate: Date;

  @IsNotEmpty({ message: 'designation is required' })
  @Length(8, 100, {
    message: 'designation length must be between 8 and 100 characters',
  })
  @IsString({ message: 'designation must be a string' })
  designation: string;

  @Optional()
  profilePhoto: string;


}

export class LoginFacultyDTO {
  @IsEmail({}, { message: 'email must be valid' })
  @IsNotEmpty({ message: 'email is required.' })
  email: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Passwords must be at least 8 characters, should include atleast one uppercase and one lowercase letter and a special character and a digit',
  })
  password: string;
}

export class FacultyUserDTO {
  @IsNotEmpty({ message: 'userPassword is required' })
  userPassword: string;
}

export class UpdateFacultyDTO {
  @Optional()
  @IsNotEmpty({ message: 'userName is required' })
  @Length(8, 100, {
    message: 'userName length must be between 8 and 100 characters',
  })
  @IsString({ message: 'userName must be a string' })
  userName: string;

  @Optional()
  @IsEmail({}, { message: 'email must be valid' })
  @IsNotEmpty({ message: 'email is required.' })
  email: string;

  @Optional()
  @IsNotEmpty({ message: 'fullName is required' })
  @Length(8, 100, {
    message: 'fullName length must be between 8 and 100 characters',
  })
  @IsString({ message: 'fullName must be a string' })
  fullName: string;

  @Optional()
  @IsNotEmpty({ message: 'dateOfBirth is required' })
  @IsDateString({}, { message: 'dateOfBirth must be a valid date' })
  dateOfBirth: Date;

  @Optional()
  @IsNotEmpty({ message: 'joiningDate is required' })
  @IsDateString({}, { message: 'joiningDate must be a valid date' })
  joiningDate: Date;

  @Optional()
  @IsNotEmpty({ message: 'designation is required' })
  @Length(8, 100, {
    message: 'designation length must be between 8 and 100 characters',
  })
  @IsString({ message: 'designation must be a string' })
  designation: string;

  @Optional()
  profilePhoto: string;

  @Optional()
  id: number;

  @Optional()
  password: string;

  @IsNotEmpty({ message: 'userPassword is required' })
  userPassword: string;
  
  
}

export class GetFacultyDTO {
  id: number;

  userName: string;

  email: string;

  fullName: string;

  dateOfBirth: Date;

  joiningDate: Date;

  designation: string;

  profilePhoto: string;

}
