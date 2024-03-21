import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto, UpdateProfileDto } from './dto/profile.dto';
import { AuthGuard } from 'src/faculty/auth/auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createProfileDto: CreateProfileDto): Promise<Object> {
    return this.profileService.create(createProfileDto);
  }

  @Get()
  findAll(): Promise<Object[]> {
    return this.profileService.findAll();
  }

  @Get('faculty/:facultyId')
  async findByFaculty(@Param('facultyId', ParseIntPipe) facultyId: number): Promise<Object> {
    return this.profileService.findByFaculty(facultyId);
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Object> {
    return this.profileService.findOne(+id);
  }
  
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(+id, updateProfileDto);
  }
  
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Object> {
    return this.profileService.remove(+id);
  }
}
