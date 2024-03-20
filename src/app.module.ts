import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';
import { StudentAuthModule } from './student/studentAuth/studentAuth.module';
import { AssignmentModule } from './assignment/assignment.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'122425',
    database:'projectStudent',
    autoLoadEntities: true,
    synchronize: true,
  }), CourseModule, StudentModule, StudentAuthModule, AssignmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
