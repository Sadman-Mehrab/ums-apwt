import { Injectable } from '@nestjs/common';
import { CreateSectionDTO, UpdateSectionDto } from './dto/section.dto';
import { SectionEntity } from './entities/section.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(SectionEntity)
    private sectionRepository: Repository<SectionEntity>,
  ) {}

  async create(createSectionDto: CreateSectionDTO): Promise<Object> {
    return await this.sectionRepository.save(createSectionDto);
  }

  async findAll(): Promise<Object[]> {
    return await this.sectionRepository.find({ relations: ['course'] });
  }

  async findOne(id: number): Promise<SectionEntity> {
    return await this.sectionRepository.findOneBy({ id: id });
  }

  async update(id: number, updateSectionDto: UpdateSectionDto) {
    return await this.sectionRepository.save({id, updateSectionDto});
  }

  async remove(id: number) : Promise<Object>{
    return await this.sectionRepository.delete({ id: id });
  }
}
