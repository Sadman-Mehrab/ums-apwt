import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { GradeEntity } from './entities/grade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GradeEntity])],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
