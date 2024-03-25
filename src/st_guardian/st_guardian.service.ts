import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { St_GuardianEntity} from './st_guardian.entity';
import { StudentEntity } from './student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import{ St_GuardianDTO, Student, loginDTO, Attendance, Performance, PTA,PaymentFee,
LeaveRequest, Grades,Notifications, cancelPTA} from './st_guardian.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class St_GuardianService{
  constructor(
    @InjectRepository(St_GuardianEntity)
    private guardianRepo: Repository<St_GuardianEntity>,
    @InjectRepository(StudentEntity)
    private studentRepo: Repository<StudentEntity>,
    private jwtService: JwtService
  ) {}

  async addGuardian(myobj: St_GuardianEntity): Promise<St_GuardianEntity> {
    return await this.guardianRepo.save(myobj);
}


async findOne( logindata:loginDTO): Promise<any> {
  return await this.guardianRepo.findOneBy({username:logindata.username});
}

async getUserProfile(userName: string): Promise<St_GuardianEntity> {
  const userProfile = await this.guardianRepo.findOne({ where: { username: userName } });
  if (!userProfile) {
      throw new NotFoundException('User profile not found');
  }
  return userProfile;

}

async updateProfile(username: string, profileData: St_GuardianDTO): Promise<St_GuardianEntity> {
  const user = await this.guardianRepo.findOne({ where: { username } });
  if (!user) {
    throw new NotFoundException('User not found');
  }
  
  // Updating user profile fields
  //user.firstname = profileData.firstname;
  user.lastname = profileData.lastname;
  //user.username = profileData.username;
  user.email = profileData.email;
  user.phoneNo = profileData.phoneNo;
  user.filename = profileData.filename;

  return await this.guardianRepo.save(user);
}

async updatePassword(username: string, password: string): Promise<St_GuardianEntity> {
  const user = await this.guardianRepo.findOne({ where: { username } });
  if (!user) {
    throw new NotFoundException('User not found');
  }

  // Hashing new password before updating
  const salt = await bcrypt.genSalt(10); // Specify salt rounds
  const hashedPassword = await bcrypt.hash(password, salt);

  // Updating user password
  user.password = hashedPassword;

  // Save in to database
  return await this.guardianRepo.save(user);
}

async getStudentProfile(email: string): Promise<StudentEntity> {
  const student = await this.studentRepo.findOne({ where: { email: email } }); 

  if (!student) {
      throw new NotFoundException('Student not found');
  }

  return student;
}

async updateStudentInfo(st: Student): Promise<StudentEntity> {
  const student = await this.studentRepo.findOne({ where: { id: st.id } });

  if (!student) {
      throw new NotFoundException('Student not found');
  }

  // Update student information
  student.firstname = student.firstname;
  student.lastname = student.lastname;
  student.email = student.email;
  student.phoneno = student.phoneno;

  // Save the changes to the database
  return this.studentRepo.save(student);
}



//route 8
async viewStudentattendance(attendence:Attendance):Promise<Attendance>{
  const { name, fromDate, toDate } = attendence;
  return attendence;
}

//route 9
async viewStudentPerformance(performance:Performance):Promise<Performance>{
  const {attendence,quizzes,lab_performance,midterms,classtasks,labexams,assignment} = performance
  return performance;
}

//route 10
async viewStudentGrades(grades:Grades):Promise<Grades>{
  const {name,courseName,grade} = grades;
  return grades;
}

//route 11
async payStudentFee(payment:PaymentFee):Promise<PaymentFee>{
  const {semester,course1,course2,course3,course4,credits,amount } = payment;
  return payment;
}

//route 12
async scheduleMeeting(pta:PTA):Promise<PTA>{
  const {scheduleDate,duration,facultyName,course} = pta
  return pta;
}

//route 13
async cancelMeeting(cancelPta:cancelPTA):Promise<cancelPTA>{
  const {message} = cancelPta;
  return cancelPta;
}

//route 14
async leaveRequest(leavereq:LeaveRequest):Promise<LeaveRequest>{
  const {studentName,startDate,endDate} = leavereq;
  return leavereq;
}

//route 15
async getNotifications(notifs:Notifications):Promise<Notifications>{
  const {message} = notifs;
  return notifs
}

}