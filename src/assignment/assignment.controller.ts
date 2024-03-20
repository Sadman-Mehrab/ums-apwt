import {
  Res,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDTO } from './dto/assignment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { StudentAuthGuard } from 'src/student/studentAuth/studentAuth.guard';

@Controller('student/assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  //@UseGuards(StudentAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  @UseInterceptors(
    FileInterceptor('assignmentFile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(pdf|docx)$/)) 
          cb(null, true);
        else 
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'file'), false);
      },
      limits: { fileSize: 10000000 },
      storage: diskStorage({
        destination: './upload',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        }
      })
    })
  )
  async create(@Body() createAssignment: CreateAssignmentDTO, @UploadedFile() assignmentFile: Express.Multer.File) {
    return this.assignmentService.create(createAssignment, assignmentFile);
  }

  //@UseGuards(StudentAuthGuard)
  @Get('file/:id')
  async getFile(@Param('id', ParseIntPipe) id: number, @Res() res) {
    return this.assignmentService.getFile(id, res);
  }

  //@UseGuards(StudentAuthGuard)
  @Get('all')
  findAll() {
    return this.assignmentService.findAll();
  }

  //@UseGuards(StudentAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentService.findOne(id);
  }

  //@UseGuards(StudentAuthGuard)
  @Delete('delete/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentService.remove(id);
  }
}
