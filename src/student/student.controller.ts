import { Controller, Get, Param, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors, Res, Patch, Body, UsePipes, ValidationPipe } from "@nestjs/common";
import { StudentService } from "./student.service";
import { GetStudentDTO, UpdateStudentDTO } from "./dto/student.dto";
import { StudentAuthGuard } from "./studentAuth/studentAuth.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService){}

  //@UseGuards(StudentAuthGuard)
  @Get('profile/:id')
  async getProfile(@Param('id', ParseIntPipe) id: number){
    return await this.studentService.getProfile(id);
  }

  //@UseGuards(StudentAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch('updateProfile/:id')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      fileFilter: (req, file, cb) => {
        if(file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
      },
      limits: { fileSize: 10000000},
      storage: diskStorage({
        destination: './upload',
        filename: function (req, file, cb){
          cb(null, Date.now() + file.originalname);
        }
      })
    })
  )
  async updateProfile(@Param('id', ParseIntPipe) id: number, @Body() studentObject: UpdateStudentDTO, @UploadedFile() profilePicture: Express.Multer.File){
    return this.studentService.updateProfile(id, studentObject, profilePicture);

  }

  //@UseGuards(StudentAuthGuard)
  @Post('uploadProfilePicture/:id')
  @UseInterceptors(
    FileInterceptor('profilePicture', {
      fileFilter: (req, file, cb) => {
        if(file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
      },
      limits: { fileSize: 10000000},
      storage: diskStorage({
        destination: './upload',
        filename: function (req, file, cb){
          cb(null, Date.now() + file.originalname);
        }
      })
    })
  )
  async uploadProfilePicture(@UploadedFile() profilePicture: Express.Multer.File, @Param('id', ParseIntPipe) id: number){
    return this. studentService.uploadProfilePicture(id, profilePicture);
  }

  //@UseGuards(StudentAuthGuard)
  @Get('getProfilePicture/:id')
  async getProfilePicture(@Param('id', ParseIntPipe) id: number, @Res() res){
    return this.studentService.getProfilePicture(id, res);
  }

  //@UseGuards(StudentAuthGuard)
  @Get(':id/courses')
  async getCourses(@Param('id', ParseIntPipe) id: number){
    return this.studentService.getCourses(id);
  }

  //@UseGuards(StudentAuthGuard)
  @Get('courses/')
  async getCourse(){
    return this.studentService.getCourse();
  }

  //@UseGuards(StudentAuthGuard)
  @Post(':id/courses/:courseId/enroll')
  async enrollCourse(@Param('id', ParseIntPipe) id: number, @Param('courseId', ParseIntPipe) courseId: number){
      return this.studentService.enrollCourse(id, courseId);
  }

  //@UseGuards(StudentAuthGuard)
  @Get('courses/:courseId/assignments')
  async getAssignments(@Param('courseId', ParseIntPipe) courseId: number){
    return this.studentService.getAssignments(courseId);
  }

  //@UseGuards(StudentAuthGuard)
  @Get('courses/:courseId/assignments/:assignmentId')
  async getAssignment(@Param('courseId', ParseIntPipe) courseId: number, @Param('assignmentId', ParseIntPipe) assignmentId: number){
    return this.studentService.getAssignment(courseId, assignmentId);
  }

  //@UseGuards(StudentAuthGuard)
  @Post(':id/courses/:courseId/assignments/:assignmentId/submit')
  async submitAssignment(@Param('id', ParseIntPipe) id: number, @Param('courseId', ParseIntPipe) courseId: number, @Param('assignmentId', ParseIntPipe) assignmentId: number){
    return this.studentService.submitAssignment(id, courseId, assignmentId); 
  }  
}
