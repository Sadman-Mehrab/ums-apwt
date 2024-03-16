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
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import * as bcrypt from 'bcrypt';
import { FacultyEntity } from '../entities/faculty.entity';

@Controller('faculty/authentication')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  // @UseInterceptors(
  //   FileInterceptor('profilePhoto', {
  //     fileFilter: (req, file, cb) => {
  //       if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
  //         cb(null, true);
  //       else {
  //         cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
  //       }
  //     },
  //     limits: { fileSize: 1000000 },
  //     storage: diskStorage({
  //       destination: './upload',
  //       filename: function (req, file, cb) {
  //         cb(null, Date.now() + file.originalname);
  //       },
  //     }),
  //   }),
  // )
  @UsePipes(new ValidationPipe())
  async registerFaculty(
    @Body() facultyObject: CreateFacultyDto,
    @UploadedFile() uploadedFile: Express.Multer.File,
  ): Promise<Object> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(facultyObject.password, salt);

    facultyObject.password = hashedPassword;
    // facultyObject.profilePhoto = uploadedFile.filename;

    return this.authService.register(facultyObject);
  }

  @Post('login')
  signIn(@Body() loginData: LoginFacultyDTO) {
    return this.authService.login(loginData);
  }
}
