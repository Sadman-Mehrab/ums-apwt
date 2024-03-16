import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FacultyService } from '../faculty.service';
import { CreateFacultyDto, LoginFacultyDTO } from 'src/faculty/dto/faculty.dto';
import * as bcrypt from 'bcrypt';
import { FacultyEntity } from '../entities/faculty.entity';

@Injectable()
export class AuthService {
  constructor(
    private facultyService: FacultyService,
    private jwtService: JwtService,
  ) {}

  async register(facultyObject: CreateFacultyDto): Promise<Object> { 
     return await this.facultyService.register(facultyObject);
  }

  async login(loginData: LoginFacultyDTO): Promise<{ access_token: string }> {
    const faculty = await this.facultyService.findOne(loginData);
    if (!faculty) {
      throw new UnauthorizedException();
    }
    const passwordMatched = await bcrypt.compare(loginData.password, faculty.password);
    if (!passwordMatched) {
      throw new UnauthorizedException();
    }
    const payload = loginData;
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
