import { Injectable } from '@nestjs/common';
import { CreateFacultyDto } from './dto/faculty.dto';


@Injectable()
export class FacultyService {
  create(createFacultyDto: CreateFacultyDto) {
    return 'This action adds a new faculty';
  }

  findAll() {
    return `This action returns all faculty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} faculty`;
  }

  update(id: number, updateFacultyDto: any) {
    return `This action updates a #${id} faculty`;
  }

  remove(id: number) {
    return `This action removes a #${id} faculty`;
  }
}
