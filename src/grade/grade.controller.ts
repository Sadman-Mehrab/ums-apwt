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
  ParseIntPipe,
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto, UpdateGradeDto } from './dto/grade.dto';

@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradeService.create(createGradeDto);
  }

  @Get()
  findAll() {
    return this.gradeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGradeDto: UpdateGradeDto,
  ) {
    return this.gradeService.update(id, updateGradeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.remove(id);
  }

  @Get('/student/:studentId')
  getStudentGrades(
    @Param('studentId', ParseIntPipe) id: number,
  ): Promise<Object[]> {
    return this.gradeService.getStudentGrades(id);
  }

  @Get('/course/:courseId')
  async getCourseGrades(
    @Param('courseId', ParseIntPipe) id: number,
  ): Promise<Object[]> {
    return await this.gradeService.getCourseGrades(id);
  }

  @Get('/student/:studentId/course/:courseId')
  async getStudentGradeForCourse(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
  ): Promise<Object[]> {
    return await this.gradeService.getStudentGradeForCourse(
      studentId,
      courseId,
    );
  }
}
