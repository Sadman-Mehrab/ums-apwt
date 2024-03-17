import {
  Body,
  Controller,
  Post,
  UsePipes,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateFacultyDto, LoginFacultyDTO } from 'src/faculty/dto/faculty.dto';

import * as bcrypt from 'bcrypt';
import { FacultyEntity } from '../entities/faculty.entity';

@Controller('faculty/authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async registerFaculty(
    @Body() facultyObject: CreateFacultyDto,
  ): Promise<Object> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(facultyObject.password, salt);

    facultyObject.password = hashedPassword;

    return this.authService.register(facultyObject);
  }

  @Post('login')
  signIn(@Body() loginData: LoginFacultyDTO) {
    return this.authService.login(loginData);
  }
}
