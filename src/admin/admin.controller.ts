import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Session,
  UseGuards,
  Res,
  Header,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { CreateStudentDto } from 'src/student/student.dto';
import { Student } from 'src/student/student.entity';
import { Faculty } from 'src/faculty/faculty.entity';
import { Guardian } from 'src/guardian/guardian.entity';
import { HttpException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common/exceptions';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AdminDTO, AdminLoginDTO, AdminUpdateDTO } from './dto/create-admin.dto';
import { AdminService } from './admin.service';
import { SessionGuard } from './session.guard';

import { AdminEntity } from './entities/admin.entity';


@Controller("admin")
export class AdminController {
  constructor(private adminService: AdminService,
    
  ) { }
  @Get()
  sendMail(): void {
    return this.adminService.sendMail();
  }

  @Get('/index')
  getAdmin(): any {
    return this.adminService.getIndex();
  }
  
  @Get('/findadmin/:id')
 
  async getAdminByID(@Param('id', ParseIntPipe) id: number): Promise<AdminEntity> {
    const res = await this.adminService.getAdminByID(id);
        if (res !== null) {
            return await this.adminService.getAdminByID(id);
        }
        else {
            throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
        }
  }

  

  

  @Post('insertadmin')
  
  @UseInterceptors(FileInterceptor('myfile',
  {storage:diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
      cb(null,Date.now()+file.originalname)
    }
  })
  }))
  insertAdmin(@Body() mydto:AdminDTO,@UploadedFile(  new ParseFilePipe({
    validators: [
      new MaxFileSizeValidator({ maxSize: 160000000 }),
      new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
    ],
  }),) file: Express.Multer.File){
  
  mydto.filenames = file.filename;  
  return this.adminService.addAdmin(mydto);
  }

  

  @Put('/updateadmin/:id')
    @UsePipes(new ValidationPipe())
    updateAdminbyID(@Param('id') id: number, @Body() data:AdminUpdateDTO ): object {
        return this.adminService.updateAdminById(id, data);
    }
    


  @Delete('/deleteadmin/:id')
  deleteAdminbyid(@Param('id', ParseIntPipe) id: number): any {
    return this.adminService.deleteAdminByID(id);
  }

  
    @Get('/getimage/:name')
    getImages(@Param('name') name, @Res() res) {
      res.sendFile(name,{ root: './uploads' })
    }
    



@Post('/signup')
@UseInterceptors(FileInterceptor('myfile',
{storage:diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null,Date.now()+file.originalname)
  }
})

}))
signup(@Body() mydto:AdminDTO,@UploadedFile(  new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 16000000}),
    new FileTypeValidator({ fileType: 'png|jpg|jpeg|' }),
  ],
}),) file: Express.Multer.File){

mydto.filenames = file.filename;  

return this.adminService.signup(mydto);

}

@Get('getimagebyadminid/:adminId')
async getimagebyid(@Param('adminId', ParseIntPipe) adminId: number, @Res() res) {
    const filename = await this.adminService.getimagebyadminid(adminId);
    res.sendFile(filename, { root: './uploads' })
}

  @Post('/signin')
  @UsePipes(new ValidationPipe())
async signin(@Session() session, @Body() mydto:AdminLoginDTO)
  {
    const res = await (this.adminService.signin(mydto));
if(res==true)
{
  session.email = mydto.email;
  return (session.email);
}
else
{
  throw new UnauthorizedException({ message: "invalid credentials" });
}
}
@Get('/signout')
signout(@Session() session)
{
  if(session.destroy())
  {
    return {message:"you are logged out"};
  }
  else
  {
    throw new UnauthorizedException("invalid actions");
  }
}


@Get('students')
  async getAllStudents(): Promise<Student[]> {
    return this.adminService.getAllStudents();
  }
@Post('addstudent')
    async addstudent(@Body() user: Student): Promise<Student> {
    return this.adminService.addstudent(user);
    }
@Put('updateStudent/:id')
    async updateStudent(@Param('id') id: number, @Body() updatedStudent: Student): Promise<Student> {
    return this.adminService.updateStudent(id, updatedStudent);
  }
  @Delete('deleteStudent/:id')
  async deleteStudent(@Param('id') id: number): Promise<string> {
    return this.adminService.deleteStudent(id);
  }
  @Get('faculty')
  async getAllFaculty(): Promise<Faculty[]> {
    return this.adminService.getAllFaculty();
  }
@Post('addfaculty')
    async addfaculty(@Body() user: Faculty): Promise<Faculty> {
    return this.adminService.addfaculty(user);
    }
@Put('updateFaculty/:id')
    async updateFaculty(@Param('id') id: number, @Body() updatedFaculty: Faculty): Promise<Faculty> {
    return this.adminService.updateFaculty(id, updatedFaculty);
  }
  @Delete('deleteFaculty/:id')
  async deleteFaculty(@Param('id') id: number): Promise<string> {
    return this.adminService.deleteFaculty(id);
  }
  @Get('guardian')
  async getAllGuardian(): Promise<Guardian[]> {
    return this.adminService.getAllGuardian();
  }
@Post('addguardian')
    async addguardian(@Body() user: Guardian): Promise<Guardian> {
    return this.adminService.addguardian(user);
    }
@Put('updateGuardian/:id')
    async updateGuardian(@Param('id') id: number, @Body() updatedGuardian: Guardian): Promise<Guardian> {
    return this.adminService.updateGuardian(id, updatedGuardian);
  }
  @Delete('deleteGuardian/:id')
  async deleteGuardian(@Param('id') id: number): Promise<string> {
    return this.adminService.deleteGuardian(id);
  }
}
