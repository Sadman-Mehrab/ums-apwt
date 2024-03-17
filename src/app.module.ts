import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacultyModule } from './faculty/faculty.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './faculty/auth/auth.module';
import { CourseModule } from './course/course.module';
import { SectionModule } from './section/section.module';
import { GradeModule } from './grade/grade.module';
import { StudentModule } from './student/student.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [FacultyModule, TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'POKPOK123',
    database:'APWT',
    autoLoadEntities: true,
    synchronize: true,
  }), AuthModule, CourseModule, SectionModule, GradeModule, StudentModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
