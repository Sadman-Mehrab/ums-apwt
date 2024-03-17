import { CreateCourseDTO } from './dto/course.dto';
import { Injectable } from '@nestjs/common';
import { CourseEntity } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class CourseService {

  constructor(
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
  ) {}

  async create(createCourseDto: CreateCourseDTO): Promise<CourseEntity> {
    return await this.courseRepository.save(createCourseDto);
  }

  async findAll() {
    return await this.courseRepository.find({ relations: ['sections'] });
  }

  async findOne(id: number) {
    return await this.courseRepository.findOneBy({ id: id });
  }

  async update(id: number, updateCourseDto: CreateCourseDTO) {
    return await this.courseRepository.save({id, updateCourseDto});
  }

  async remove(id: number) {
    return await this.courseRepository.delete({ id: id });
  }
}
