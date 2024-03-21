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
  UseGuards,
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto, UpdateGradeDto } from './dto/grade.dto';
import { GradeEntity } from './entities/grade.entity';
import { AuthGuard } from 'src/faculty/auth/auth.guard';

@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @UseGuards(AuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createGradeDto: CreateGradeDto): Promise<GradeEntity> {
    return this.gradeService.create(createGradeDto);
  }
  
  @UseGuards(AuthGuard)
  @Post('addAttendance/:studentId/:gradeId')
  addAttendance(@Param('studentId', ParseIntPipe) studentId: number,@Param('gradeId', ParseIntPipe) gradeId: number ): Promise<Object> {
    return this.gradeService.addAttendance(studentId, gradeId);
  }


  @Get()
  findAll() {
    return this.gradeService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.gradeService.findOne(id);
  }
  
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGradeDto: UpdateGradeDto,
  ) {
    return this.gradeService.update(id, updateGradeDto);
  }

  @UseGuards(AuthGuard)
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
