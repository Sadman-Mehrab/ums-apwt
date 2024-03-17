import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { FacultyService } from './faculty.service';
import {
  CreateFacultyDto,
  FacultyUserDTO,
  GetFacultyDTO,
} from './dto/faculty.dto';
import { FacultyEntity } from './entities/faculty.entity';
import { AuthGuard } from './auth/auth.guard';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Get()
  findAll(@Query('designation') designation): Promise<GetFacultyDTO[]> {
    if (!designation) return this.facultyService.findAll();
    else return this.facultyService.findAllByDesignation(designation);
  }

  @Get(':id/sections')
  async getFacultySections(@Param('id', ParseIntPipe) id: number): Promise<Object[]> {
    return await this.facultyService.getFacultySections(id);
  }

  @Get(':id/articles')
  async getFacultyArticles(@Param('id', ParseIntPipe) id: number): Promise<Object[]> {
    return await this.facultyService.getFacultySections(id);
  }

  @UseGuards(AuthGuard)
  @UsePipes()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFacultyDto: any,
  ): Promise<Object> {
    return this.facultyService.update(id, updateFacultyDto);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: FacultyUserDTO,
  ): Promise<Object> {
    return this.facultyService.remove(id, user);
  }
}
