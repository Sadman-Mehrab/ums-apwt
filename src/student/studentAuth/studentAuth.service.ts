import { Injectable, UnauthorizedException } from "@nestjs/common";
import { StudentService } from "../student.service";
import { JwtService } from "@nestjs/jwt";
import { CreateStudentDTO, GetStudentDTO, LoginStudentDTO } from "../dto/student.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentAuthService{
    constructor(
        private studentService: StudentService, 
        private jwtService: JwtService
    ){}
    async registerStudent(studentObject: CreateStudentDTO): Promise<GetStudentDTO>{
        return await this.studentService.registerStudent(studentObject);
    }

    async loginStudent(loginData: LoginStudentDTO): Promise<{access_token: string}>{
        const student = await this.studentService.loginStudent(loginData)
        if(!student){
            throw new UnauthorizedException();
        }
        const passMatch = await bcrypt.compare(loginData.password, student.password);
        if(!passMatch){
            throw new UnauthorizedException();
        }
        const payload = loginData;
        return{
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}