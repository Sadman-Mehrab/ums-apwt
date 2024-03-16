import { Injectable } from '@nestjs/common';
import { CreateFacultyDto, LoginFacultyDTO } from './dto/faculty.dto';
import { FacultyEntity } from './entities/faculty.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FacultyService {
  constructor(
    @InjectRepository(FacultyEntity)
    private facultyRepository: Repository<FacultyEntity>,
  ) {}

  async register(facultyObject: CreateFacultyDto): Promise<Object> {
    const { password, ...response } = await this.facultyRepository.save(facultyObject);
    return response;
  }

  async findAll(): Promise<Object[]>{
    const faculties = await this.facultyRepository.find({});
    return faculties.map(({ password, ...response }) => response )
  }

  async findOne(loginData: LoginFacultyDTO): Promise<any> {
    return await this.facultyRepository.findOneBy({ email: loginData.email });
  }

  update(id: number, updateFacultyDto: any) {
    return `This action updates a #${id} faculty`;
  }

  remove(id: number) {
    return `This action removes a #${id} faculty`;
  }
}
