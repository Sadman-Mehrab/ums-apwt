import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './course/course.module';
import { StudentModule } from './student/student.module';
import { StudentAuthModule } from './student/studentAuth/studentAuth.module';
import { AssignmentModule } from './assignment/assignment.module';
import { FacultyModule } from './faculty/faculty.module';
import { AuthModule } from './faculty/auth/auth.module';
import { SectionModule } from './section/section.module';
import { GradeModule } from './grade/grade.module';
import { ArticleModule } from './article/article.module';

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
  }), CourseModule, StudentModule, StudentAuthModule, AssignmentModule, AuthModule,SectionModule, GradeModule, ArticleModule, FacultyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
