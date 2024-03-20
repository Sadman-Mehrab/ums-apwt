import { AssignmentEntity } from 'src/assignment/entities/assignment.entity';
import { StudentEntity } from 'src/student/entities/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  courseId: number;

  @Column({ name: 'courseName', type: 'varchar', length: 100 })
  courseName: string;

  @Column({ name: 'department', type: 'varchar', length: 100 })
  department: string;

  @Column({ name: 'credit', type: 'int' })
  credit: number;

  @ManyToOne(() => StudentEntity, (student) => student.courses)
  student: StudentEntity;

  @OneToMany(() => AssignmentEntity, (assignment) => assignment.course, {lazy: true})
  assignments: Promise<AssignmentEntity[]>;
}
