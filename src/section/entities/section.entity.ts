import { CourseEntity } from 'src/course/entities/course.entity';
import { FacultyEntity } from 'src/faculty/entities/faculty.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('section')
export class SectionEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'sectionName', type: 'varchar', length: 100 })
  sectionName: string;

  @ManyToOne(() => CourseEntity, (course) => course.sections)
  course: CourseEntity;

  @ManyToOne(() => FacultyEntity, (faculty) => faculty.sections)
  faculty: FacultyEntity;
}
