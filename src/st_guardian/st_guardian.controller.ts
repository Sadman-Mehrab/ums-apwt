import { Controller, Get, Post, Patch, Put, Delete, Body, Request, Query,
    UsePipes,ValidationPipe, UseInterceptors,Param,Res, 
    UploadedFile, 
    UseGuards} from "@nestjs/common";
import {St_GuardianService} from './st_guardian.service';
import{ St_GuardianDTO, Student, loginDTO, updatePasswordDTO, Attendance, Performance, PTA,PaymentFee,
    LeaveRequest, Grades,Notifications, cancelPTA} from './st_guardian.dto';
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { AuthGuard } from "./auth/auth.guard";
import * as bcrypt from 'bcrypt';
import { St_GuardianEntity } from "./st_guardian.entity";
import { StudentEntity } from './student.entity';



@Controller('/st_guardian')
export class St_GuardianController{
    constructor(private readonly st_guardianService: St_GuardianService){}

@UseGuards(AuthGuard)
@Post('signup')
@UseInterceptors(FileInterceptor('myfile',
        {
            fileFilter: (req, file, cb) => {
                if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                    cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                }
            },
            limits: { fileSize: 30000 },
            storage: diskStorage({
                destination: './upload',
                filename: function (req, file, cb) {
                    cb(null, Date.now() + file.originalname)
                },
            })
        }
    ))
    @UsePipes(new ValidationPipe)
    async addUser(@Body() myobj: St_GuardianDTO, @UploadedFile() myfile: Express.Multer.File): Promise<St_GuardianDTO> {
        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(myobj.password, salt); 
        myobj.password= hashedpassword;
        myobj.filename = myfile.filename;
        return this.st_guardianService.addGuardian(myobj);
        //return this.st_guardianService.addGuardian(myobj as St_GuardianEntity);

    }

    @Get('/getimage/:name')
    getImages(@Param('name') name: string, @Res() res) {
        res.sendFile(name, { root: './upload' })
    }


    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const userName = req.user.username; // Extract the user ID from the request
        return await this.st_guardianService.getUserProfile(userName);
    }

    @UseGuards(AuthGuard)
  @Patch('profile')
  async updateProfile(@Request() req, @Body() profileData: St_GuardianDTO) {
    const userName = req.user.username;
    return await this.st_guardianService.updateProfile(userName, profileData);
  }

  @UseGuards(AuthGuard)
  @Patch('profile/password')
  async updatePassword(@Request() req, @Body() passwordData: updatePasswordDTO) {
    const userName = req.user.username;
    return await this.st_guardianService.updatePassword(userName, passwordData.password);
  }


  /*
  @Get('student') // Use path parameter instead of body
async getStudentProfile(@Query('email') email: string): Promise<StudentEntity> {
  return await this.st_guardianService.getStudentProfile(email);
}

*/

@Get('student/profile')
    async getStudentProfile(@Query('email') email: string): Promise<StudentEntity> {
        return await this.st_guardianService.getStudentProfile(email);
    }

@Patch('student')
async updateStudentInfo(@Body() student: Student): Promise<StudentEntity> {
  return this.st_guardianService.updateStudentInfo(student);
}




//route 8
@Get('student-attendance')
async viewStudentattendance(@Body() attendence: Attendance):Promise<Attendance>{
    return this.st_guardianService.viewStudentattendance(attendence);
}

//route 9
@Get('student-performance')
async viewStudentPerformance(@Body() performance: Performance):Promise<Performance>{
    return this.st_guardianService.viewStudentPerformance(performance);
}

//route 10
@Get('student-grades')
async viewStudentGrades(@Body() grades: Grades):Promise<Grades>{
    return this.st_guardianService.viewStudentGrades(grades);
}

//route 11
@Post('payment')
async payStudentFee(@Body() payment: PaymentFee):Promise<PaymentFee>{
    return this.st_guardianService.payStudentFee(payment);
}

//route 12
@Post('schedule-PTA')
async scheduleMeeting(@Body() pta: PTA):Promise<PTA>{
    return this.st_guardianService.scheduleMeeting(pta);
}

//route 13
@Delete('cancel-PTA')
async cancelMeeting(@Body() cancelPta: cancelPTA):Promise<cancelPTA>{
    return this.st_guardianService.cancelMeeting(cancelPta);
}

//route 14

@Post('leave-request')
async leaveRequest(@Body() leavereq:LeaveRequest):Promise<LeaveRequest>{
    return this.st_guardianService.leaveRequest(leavereq);
}

//route 15
@Get('notifications')
async getNotifications(@Body() notifs:Notifications):Promise<Notifications>{
    return this.st_guardianService.getNotifications(notifs);
}


}
