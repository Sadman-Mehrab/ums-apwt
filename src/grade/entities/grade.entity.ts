import { CourseEntity } from 'src/course/entities/course.entity';
import { FacultyEntity } from 'src/faculty/entities/faculty.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('grade')
export class GradeEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'OBE', type: 'int', default:0 })
  OBE: number;

  @Column({ name: 'quiz', type: 'int', default:0 })
  quiz: number;

  @Column({ name: 'attendance', type: 'int', default:0 })
  attendance: number;

  @Column({ name: 'term', type: 'int', default:0 })
  term: number;

  @Column({ name: 'total', type: 'int', default:0 })
  total: number;
  
  @Column({ name: 'overallGrade', type: 'varchar', length:10, default: "I" })
  overallGrade: string;

  @ManyToOne(() => CourseEntity, (course) => course.sections)
  course: CourseEntity;

  @ManyToOne(() => FacultyEntity, (faculty) => faculty.sections)
  faculty: FacultyEntity;

  @ManyToOne(() => StudentEntity, (student) => student.grades)
  student: StudentEntity;

}
