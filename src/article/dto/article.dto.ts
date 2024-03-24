import { Optional } from '@nestjs/common';
import { IsString, IsNotEmpty, Length, IsInt, Min, Max, IsDateString, IsArray } from 'class-validator';

export class CreateArticleDTO {
  @IsNotEmpty({ message: 'title is required' })
  @Length(1, 200, {
    message: 'title length must be between 1 and 100 characters',
  })
  @IsString({ message: 'title must be a string' })
  title: string;

  @IsNotEmpty({ message: 'content is required' })
  @Length(1, 5000, {
    message: 'content length must be between 1 and 5000 characters',
  })
  @IsString({ message: 'content must be a string' })
  content: string;

  @IsNotEmpty({ message: 'datePublished is required' })
  @IsDateString({}, { message: 'datePublished must be a valid date' })
  @IsNotEmpty({ message: 'datePublished is required' })
  datePublished: Date;

  @IsNotEmpty({ message: 'tags is required' })
  @IsArray({ message: 'tags must be an array' })
  tags: string[];


}

export class UpdateArticleDTO {
  @IsNotEmpty({ message: 'title is required' })
  @Length(1, 200, {
    message: 'title length must be between 1 and 100 characters',
  })
  @IsString({ message: 'title must be a string' })
  title: string;

  @IsNotEmpty({ message: 'content is required' })
  @Length(1, 5000, {
    message: 'content length must be between 1 and 5000 characters',
  })
  @IsString({ message: 'content must be a string' })
  content: string;

  @IsNotEmpty({ message: 'datePublished is required' })
  @IsDateString({}, { message: 'datePublished must be a valid date' })
  @IsNotEmpty({ message: 'datePublished is required' })
  datePublished: Date;

  @IsNotEmpty({ message: 'tags is required' })
  @IsArray({ message: 'tags must be an array' })
  tags: string[];


}

