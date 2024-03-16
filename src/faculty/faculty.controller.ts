import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { FacultyService } from './faculty.service';
import { CreateFacultyDto } from './dto/faculty.dto';
import { FacultyEntity } from './entities/faculty.entity';
import { AuthGuard } from './auth/auth.guard';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() : Promise<Object[]>{
    return this.facultyService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFacultyDto: any) {
    return this.facultyService.update(+id, updateFacultyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facultyService.remove(+id);
  }
}
