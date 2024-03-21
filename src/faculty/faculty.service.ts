import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CreateFacultyDto,
  FacultyUserDTO,
  GetFacultyDTO,
  LoginFacultyDTO,
  UpdateFacultyDTO,
} from './dto/faculty.dto';
import { FacultyEntity } from './entities/faculty.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FacultyService {
  constructor(
    @InjectRepository(FacultyEntity)
    private facultyRepository: Repository<FacultyEntity>,
  ) {}

  async findIfExists(id: number): Promise<FacultyEntity> {
    const faculty = await this.facultyRepository.findOneBy({ id: id });
    if (!faculty) throw new NotFoundException();
    else return faculty;
  }

  async register(facultyObject: CreateFacultyDto): Promise<GetFacultyDTO> {
    const { password, ...response } =
      await this.facultyRepository.save(facultyObject);
    return response;
  }

  async login(loginData: LoginFacultyDTO): Promise<any> {
    return await this.facultyRepository.findOneBy({ email: loginData.email });
  }

  async findAll(): Promise<GetFacultyDTO[]> {
    const faculties = await this.facultyRepository.find({});
    return faculties.map(({ password, ...response }) => response);
  }

  async findAllByDesignation(designation: string): Promise<GetFacultyDTO[]> {
    const faculties = await this.facultyRepository.findBy({
      designation: designation,
    });
    return faculties.map(({ password, ...response }) => response);
  }

  async update(
    id: number,
    updateFacultyDto: UpdateFacultyDTO,
  ): Promise<Object> {
    const faculty = await this.findIfExists(id);
    const passwordMatched = await bcrypt.compare(
      updateFacultyDto.userPassword,
      faculty.password,
    );
    if (!passwordMatched) throw new UnauthorizedException();

    if (updateFacultyDto.id || updateFacultyDto.password)
      throw new UnauthorizedException();
    const { userPassword, ...response } = await this.facultyRepository.save({
      id,
      ...updateFacultyDto,
    });
    return response;
  }

  async remove(id: number, user: FacultyUserDTO): Promise<Object> {
    const faculty = await this.findIfExists(id);
    const passwordMatched = await bcrypt.compare(
      user.userPassword,
      faculty.password,
    );
    if (!passwordMatched) throw new UnauthorizedException();

    return await this.facultyRepository.delete({ id: id });
  }

  async getFacultySections(id: number): Promise<Object[]> {
    const faculty = await this.findIfExists(id);
    const sections = await this.facultyRepository.find({
      where: { id: id },
      relations: ['sections'],
    });
    return sections.map(({ password, ...response }) => response);
  }

  async getFacultyArticles(id: number): Promise<Object[]> {
    const faculty = await this.findIfExists(id);
    const articles = await this.facultyRepository.find({
      where: { id: id },
      relations: ['articles'],
    });
    return articles.map(({ password, ...response }) => response);
  }

  async uploadProfilePhoto(
    id: number,
    uploadedProfilePhoto: Express.Multer.File,
  ) {
    const faculty = await this.findIfExists(id);
    faculty.profilePhoto = uploadedProfilePhoto.filename;
    const { password, ...response } =
      await this.facultyRepository.save({
        id,
        ...faculty,
      });
    return response;
  }

  async getProfilePhoto(id: number, res) {
    const faculty = await this.findIfExists(id);
    res.sendFile(faculty.profilePhoto, { root: './upload' });
  }
}
