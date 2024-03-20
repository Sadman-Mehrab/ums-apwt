import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { StudentAuthService } from "./studentAuth.service";
import * as bcrypt from 'bcrypt';
import { CreateStudentDTO, LoginStudentDTO } from "../dto/student.dto";

@Controller('student/authentication')
export class StudentAuthController{
    constructor(private studentAuthService: StudentAuthService){}

    @Post('register')
    @UsePipes(new ValidationPipe())
    async registerStudent(@Body() studentObject: CreateStudentDTO): Promise<Object> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(studentObject.password, salt);

        studentObject.password = hashedPassword;
        
        return this.studentAuthService.registerStudent(studentObject);
    }

    @Post('login')
    @UsePipes(new ValidationPipe())
    loginStudent(@Body() LoginData: LoginStudentDTO){
        return this.studentAuthService.loginStudent(LoginData);
    }
}