import { Optional } from '@nestjs/common';
import { IsString, IsNotEmpty, Length, IsInt, Min, Max } from 'class-validator';
import { Entity } from 'typeorm';


export class CreateGradeDto {
  @IsNotEmpty({ message: 'OBE is required' })
  @Min(0, {message: 'OBE must be greater than or equal to 0'})
  @Max(30, {message: 'OBE must be less than or equal to 30'})
  @IsInt({ message: 'OBE must be a number' })
  OBE: number;

  @IsNotEmpty({ message: 'term is required' })
  @Min(0, {message: 'term must be greater than or equal to 0'})
  @Max(50, {message: 'term must be less than or equal to 50'})
  @IsInt({ message: 'term must be a number' })
  term: number;

  @IsNotEmpty({ message: 'attendance is required' })
  @Min(0, {message: 'attendance must be greater than or equal to 0'})
  @Max(10, {message: 'attendance must be less than or equal to 10'})
  @IsInt({ message: 'attendance must be a number' })
  attendance: number;

  @IsNotEmpty({ message: 'quiz is required' })
  @Min(0, {message: 'quiz must be greater than or equal to 0'})
  @Max(10, {message: 'quiz must be less than or equal to 10'})
  @IsInt({ message: 'quiz must be a number' })
  quiz: number;

  @Min(0, {message: 'total must be greater than or equal to 0'})
  @Max(100, {message: 'total must be less than or equal to 100'})
  @IsInt({ message: 'total must be a number' })
  @IsNotEmpty({ message: 'total is required' })
  total: number;

  @IsNotEmpty({ message: 'overallGrade is required' })
  overallGrade: string;



}


export class UpdateGradeDto {
    @IsNotEmpty({ message: 'OBE is required' })
    @Min(0, {message: 'OBE must be greater than or equal to 0'})
    @Max(30, {message: 'OBE must be less than or equal to 30'})
    @IsInt({ message: 'OBE must be a number' })
    OBE: number;
  
    @IsNotEmpty({ message: 'term is required' })
    @Min(0, {message: 'term must be greater than or equal to 0'})
    @Max(50, {message: 'term must be less than or equal to 50'})
    @IsInt({ message: 'term must be a number' })
    term: number;
  
    @IsNotEmpty({ message: 'attendance is required' })
    @Min(0, {message: 'attendance must be greater than or equal to 0'})
    @Max(10, {message: 'attendance must be less than or equal to 10'})
    @IsInt({ message: 'attendance must be a number' })
    attendance: number;
  
    @IsNotEmpty({ message: 'quiz is required' })
    @Min(0, {message: 'quiz must be greater than or equal to 0'})
    @Max(10, {message: 'quiz must be less than or equal to 10'})
    @IsInt({ message: 'quiz must be a number' })
    quiz: number;
  
    @Min(0, {message: 'total must be greater than or equal to 0'})
    @Max(100, {message: 'total must be less than or equal to 100'})
    @IsInt({ message: 'total must be a number' })
    @IsNotEmpty({ message: 'total is required' })
    total: number;
    
    @IsNotEmpty({ message: 'overallGrade is required' })
    overallGrade: string;
  
  
  
  
  
    
  
  }