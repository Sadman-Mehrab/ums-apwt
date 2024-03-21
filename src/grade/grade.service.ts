import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findIfExists(id: number): Promise<GradeEntity> {
    const grade = await this.gradeRepository.findOneBy({ id: id });
    if (!grade) throw new NotFoundException();
    else return grade;
  }

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

  async create(createGradeDto: CreateGradeDto): Promise<GradeEntity> {
    const gradeObject = this.calculateGrade(createGradeDto);
    return await this.gradeRepository.save(gradeObject);
  }

  async findAll() {
    return await this.gradeRepository.find({});
  }

  async findOne(id: number) {
    const grade = this.findIfExists(id);
    return await this.gradeRepository.findOneBy({ id: id });
  }

  async update(id: number, updateGradeDto: UpdateGradeDto): Promise<Object> {
    const grade = this.findIfExists(id);
    const gradeObject = this.calculateGrade(updateGradeDto);
    return await this.gradeRepository.save({ id, gradeObject });
  }

  async remove(id: number): Promise<Object> {
    const grade = this.findIfExists(id);
    return await this.gradeRepository.delete({ id: id });
  }

  async getStudentGrades(id: number): Promise<Object[]> {
    const grade = this.findIfExists(id);
    return;
  }

  async getCourseGrades(id: number): Promise<Object[]> {
    const grade = this.findIfExists(id);
    return await this.gradeRepository.find({
      relations: ['course'],
      where: { course: { id: id } },
    });
  }

  async getStudentGradeForCourse(
    studentId: number,
    courseId: number,
  ): Promise<Object[]> {
    return await this.gradeRepository.find({
      relations: ['student', 'course'],
      where: { student: { id: studentId }, course: { id: courseId } },
    });
  }

  async addAttendance(studentId: number, gradeId: number): Promise<Object> {
    const grade = this.findIfExists(gradeId);
    const updatedGrade = await this.gradeRepository.find({
      relations: ['student'],
      where: { id: gradeId, student: { id: studentId } },
    });
    const attendance = updatedGrade[0].attendance;
    if (attendance >= 10) {
      return { message: 'Full Attendace' };
    } else {
      updatedGrade[0].attendance += 1;
      return await this.gradeRepository.save({ gradeId, ...updatedGrade[0] });
    }
  }
}
