import { Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateStudentDTO, GetStudentDTO, LoginStudentDTO, UpdateStudentDTO } from './dto/student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { response } from 'express';
import { CourseEntity } from 'src/course/entities/course.entity';
import { GetCourseDTO } from 'src/course/dto/course.dto';
import { AssignmentEntity } from 'src/assignment/entities/assignment.entity';


@Injectable()
export class StudentService {
    constructor(
      @InjectRepository(StudentEntity)
      private studentRepository: Repository<StudentEntity>,
      @InjectRepository(CourseEntity)
      private courseRepository: Repository<CourseEntity>,
      @InjectRepository(AssignmentEntity)
      private assignmentRepository: Repository<AssignmentEntity>
    ){}

    async findIfExists(id: number): Promise<StudentEntity>{
      const student = await this.studentRepository.findOneBy({id : id});
      if(!student)
        throw new NotFoundException('Student not found!');
      else
        return student;
    }

    async registerStudent(studentObject: CreateStudentDTO): Promise<GetStudentDTO>{
      const {password, courses, ...response} = await this.studentRepository.save(studentObject);
      return response;
    }

    async loginStudent(loginData: LoginStudentDTO): Promise<any>{
      return await this.studentRepository.findOneBy({email: loginData.email});
    }


    async getProfile(id: number): Promise<GetStudentDTO>{
      const {password, courses, ...response} = await this.findIfExists(id);
      return response;
    }

    async updateProfile(id: number, studentObject: UpdateStudentDTO, uploadProfilePicture: Express.Multer.File): Promise<GetStudentDTO>{
      const student = await this.findIfExists(id);
      const passMatch = await bcrypt.compare(studentObject.userPassword, student.password);
      if(!passMatch)
        throw new UnauthorizedException();
      if(studentObject.id || studentObject.password)
        throw new UnauthorizedException();
      student.profilePicture = uploadProfilePicture.filename;
      await this.studentRepository.save({id, ...student});
      await this.studentRepository.save({id, ...studentObject});
      const{ password, courses, ...response} = await this.findIfExists(id);
      return response;
    }

    async uploadProfilePicture(id: number, uploadProfilePicture: Express.Multer.File){
      const student = await this.findIfExists(id);
      student.profilePicture = uploadProfilePicture.filename;
      const { password, profilePicture, courses, ...response} = await this.studentRepository.save({id, ...student})
      return response;
    }

    async getProfilePicture(id: number, res){
      const student = await this.findIfExists(id);
      res.sendFile(student.profilePicture, {root: './upload'});
    }

    async getCourses(id: number): Promise<Object[]> {
      const student = await this.findIfExists(id);
      const courses = await this.studentRepository.find({
        where: {id: id},
        relations: ['courses']
      });
      return courses.map(({email, password, program, fatherName, address, admissionDate, gender, dateOfBirth, nationality, religion, bloodGroup,phoneNumber, profilePicture, ...response}) => response);
    }

    async getCourse(id: number, courseId: number){
      const student = await this.findIfExists(id);
      const course = await this.courseRepository.find({
        where: {courseId: courseId},
        relations: ['student']
      });
      return course.map(({student, assignments, ...response}) => response);
    }

    async enrollCourse(id: number, courseId: number){
      const student = await this.findIfExists(id);
      const course = await this.courseRepository.findOneBy({courseId: courseId})
      if(!course)
        throw new NotFoundException('Course not found!');
      const courses = await student.courses;
      courses.push(course);
      const { email, password, program, fatherName, address, admissionDate, gender, dateOfBirth, nationality, religion, bloodGroup,phoneNumber, profilePicture, ...response} = await this.studentRepository.save({id, ...student});
      return response;
    }

    async getAssignments(courseId: number): Promise<Object[]>{
      const course = await this.courseRepository.findOneBy({courseId: courseId})
      if(!course)
        throw new NotFoundException('Course not found!');
      const assignments = await this.courseRepository.find({
        where: {courseId: courseId},
        relations: ['assignments']
      });
      return assignments.map(({department, credit, student, ...response}) => response);
    }

    async getAssignment(courseId: number, assignmentId: number){
      const course = await this.courseRepository.findOneBy({courseId: courseId})
      if(!course)
        throw new NotFoundException('Course not found!');
      const assignment = await this.assignmentRepository.find({
        where: {assignmentId: assignmentId},
        relations: ['course']
      });
      return assignment;
    }

    async submitAssignment(id: number, courseId: number, assignmentId: number){
      const Isstudent = await this.findIfExists(id);
      const course = await this.courseRepository.findOneBy({courseId: courseId})
      if(!course)
        throw new NotFoundException('Course not found!');
      const assignment = await this.assignmentRepository.findOneBy({assignmentId: assignmentId})
      if(!assignment)
        throw new NotFoundException('Assignment not found!');
      const assignments = await course.assignments;
      assignments.push(assignment);
      const{department, credit, student, ...response} = await this.courseRepository.save({courseId, ...course});
      return response;
    }
}
