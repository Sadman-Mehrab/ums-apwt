import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './entities/student.entity';
import { Repository } from 'typeorm';
// import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  async findAll(id: number) {
    return await this.studentRepository.find( {
      where: {id: id},
      relations: ['sections']
    }
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  // update(id: number, updateStudentDto: UpdateStudentDto) {
  //   return `This action updates a #${id} student`;
  // }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
