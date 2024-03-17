import { GradeEntity } from 'src/grade/entities/grade.entity';
import { SectionEntity } from 'src/section/entities/section.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity('student')
export class StudentEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @OneToMany(() => GradeEntity, (grade) => grade.student)
  grades: GradeEntity[];


  @ManyToMany(() => SectionEntity, (section) => section.students)
  sections: SectionEntity[];
}
