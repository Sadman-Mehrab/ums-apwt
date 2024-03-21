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
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FacultyService } from './faculty.service';
import {
  CreateFacultyDto,
  FacultyUserDTO,
  GetFacultyDTO,
} from './dto/faculty.dto';
import { FacultyEntity } from './entities/faculty.entity';
import { AuthGuard } from './auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

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
    return await this.facultyService.getFacultyArticles(id);
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
    
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: FacultyUserDTO,
  ): Promise<Object> {
    return this.facultyService.remove(id, user);
  }

  @Get(':id/getProfilePhoto')
  getProfilePhoto(@Param('id', ParseIntPipe) id: number , @Res() res){
    return this.facultyService.getProfilePhoto(id,res);
  }

  @UseGuards(AuthGuard)
  @Post(':id/uploadProfilePhoto')
  @UseInterceptors(
    FileInterceptor('profilePhoto', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 10000000  },
      storage: diskStorage({
        destination: './upload',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadProfilePhoto(@UploadedFile() profilePhoto: Express.Multer.File, @Param('id', ParseIntPipe) id: number ){
    return this.facultyService.uploadProfilePhoto(id, profilePhoto);
  }
}
