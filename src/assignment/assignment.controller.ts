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
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDTO } from './dto/assignment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@Controller('assignment')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post('/')
  @UseInterceptors(
    FileInterceptor('assignmentFile', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(pdf|docx)$/)) cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'file'), false);
        }
      },
      limits: { fileSize: 10000000 },
      storage: diskStorage({
        destination: './upload',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  @Post()
  create(
    @Body() createAssignmentDto: CreateAssignmentDTO,
    @UploadedFile() assignmentFile: Express.Multer.File,
  ) {
    return this.assignmentService.create(createAssignmentDto, assignmentFile);
  }

  @Get()
  findAll() {
    return this.assignmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentService.findOne(id);
  }
  @Get('/file/:id')
  getFile(@Param('id', ParseIntPipe) id: number, @Res() res) {
    return this.assignmentService.getFile(id, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignmentService.remove(+id);
  }
}
