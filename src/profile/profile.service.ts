import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileEntity)
    private profileRepository: Repository<ProfileEntity>,
  ) {}

  async findIfExists(id: number): Promise<ProfileEntity> {
    const profile = await this.profileRepository.findOneBy({ id: id });
    if (!profile) throw new NotFoundException();
    else return profile;
  }

  async create(createProfileDto: CreateProfileDto): Promise<Object> {
    return await this.profileRepository.save(createProfileDto);
  }

  async findAll(): Promise<Object[]> {
    return await this.profileRepository.find({relations: ['faculty']});
  }

  async findOne(id: number): Promise<Object> {
    const profile = this.findIfExists;
    return await this.profileRepository.findOneBy({ id: id });
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = this.findIfExists;
    return await this.profileRepository.save({ id, ...updateProfileDto });
  }

  async remove(id: number): Promise<Object> {
    const profile = this.findIfExists;
    return await this.profileRepository.delete({ id: id });
  }

  async findByFaculty(facultyId: number): Promise<Object> {
    const profile = await this.profileRepository.find({
      relations: ['faculty'],
      where: { faculty: { id: facultyId } },
    });
    
    delete profile[0].faculty.password;
    return profile[0];
  }
}
