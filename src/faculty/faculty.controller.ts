import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { CreateFacultyDto } from './dto/faculty.dto';
import { FacultyEntity } from './entities/faculty.entity';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}


  @Get()
  findAll() {
    return this.facultyService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.facultyService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacultyDto: any) {
    return this.facultyService.update(+id, updateFacultyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facultyService.remove(+id);
  }
}
