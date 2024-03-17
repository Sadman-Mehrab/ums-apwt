import { Injectable } from '@nestjs/common';
import { CreateGradeDto, UpdateGradeDto } from './dto/grade.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GradeEntity } from './entities/grade.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GradeService {
  constructor(
    @InjectRepository(GradeEntity)
    private gradeRepository: Repository<GradeEntity>,
  ) {}

  calculateGrade(gradeObject: CreateGradeDto): CreateGradeDto {
    const totalMarks =
      gradeObject.attendance +
      gradeObject.quiz +
      gradeObject.term +
      gradeObject.OBE;
    let overallGrade = gradeObject.overallGrade;

    if (totalMarks >= 90 && totalMarks <= 100) {
      overallGrade = 'A+';
    } else if (totalMarks >= 85 && totalMarks < 90) {
      overallGrade = 'A';
    } else if (totalMarks >= 80 && totalMarks < 85) {
      overallGrade = 'B+';
    } else if (totalMarks >= 75 && totalMarks < 80) {
      overallGrade = 'B';
    } else if (totalMarks >= 70 && totalMarks < 75) {
      overallGrade = 'C+';
    } else if (totalMarks >= 65 && totalMarks < 70) {
      overallGrade = 'C';
    } else if (totalMarks >= 60 && totalMarks < 65) {
      overallGrade = 'D';
    } else {
      overallGrade = 'F';
    }

    gradeObject.total = totalMarks;
    gradeObject.overallGrade = overallGrade;
    return gradeObject;
  }

  async create(createGradeDto: CreateGradeDto): Promise<Object> {
    const gradeObject = this.calculateGrade(createGradeDto);
    return await this.gradeRepository.save(gradeObject);
  }

  async findAll() {
    return await this.gradeRepository.find({});
  }

  async findOne(id: number) {
    return await this.gradeRepository.findOneBy({ id: id });
  }

  async update(id: number, updateGradeDto: UpdateGradeDto): Promise<Object> {
    const gradeObject = this.calculateGrade(updateGradeDto);
    return await this.gradeRepository.save({ id, gradeObject });
  }

  async remove(id: number): Promise<Object> {
    return await this.gradeRepository.delete({ id: id });
  }

  async getStudentGrades(id: number): Promise<Object[]> {
    return await this.gradeRepository.find({
      relations: ['student'],
      where: { student: { id: id } },
    });
  }

  async getCourseGrades(id: number): Promise<Object[]> {
    return await this.gradeRepository.find({
      relations: ['course'],
      where: { course: { id: id } },
    });
  }

  async getStudentGradeForCourse(studentId:number, courseId:number): Promise<Object[]>{
    return await this.gradeRepository.find({
      relations: ['student', 'course'],
      where: { student: { id: studentId }, course: { id: courseId } }
    });
  }
}
