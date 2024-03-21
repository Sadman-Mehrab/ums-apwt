import { Injectable, Res } from '@nestjs/common';
import { CreateAssignmentDTO } from './dto/assignment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentEntity } from './entities/assignment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(AssignmentEntity)
    private assignmentRepository: Repository<AssignmentEntity>,
  ) {}

  async create(
    createAssignmentDto: CreateAssignmentDTO,
    assignmentFile: Express.Multer.File,
  ) {
    createAssignmentDto.assignmentFile = assignmentFile.filename;
    return await this.assignmentRepository.save(createAssignmentDto);
  }

  async getFile(id: number, @Res() res) {
    const assignment = await this.assignmentRepository.findOneBy({ id: id });
    res.sendFile(assignment.assignmentFile, { root: './upload' });
  }

  async findAll() {
    return await this.assignmentRepository.find({});
  }

  async findOne(id: number) {
    return await this.assignmentRepository.findOneBy({ id: id });
  }

  async remove(id: number) {
    return await this.assignmentRepository.delete(id);
  }
}
