import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { StudentEntity } from './entities/student.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentAuthService } from './studentAuth/studentAuth.service';
import { CourseEntity } from 'src/course/entities/course.entity';
import { AssignmentEntity } from 'src/assignment/entities/assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity,CourseEntity,AssignmentEntity])],
  controllers: [StudentController],
  providers: [StudentService, StudentAuthService,],
  exports: [StudentService]
})
export class StudentModule {}
