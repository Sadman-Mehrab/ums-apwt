import { CourseEntity } from 'src/course/entities/course.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('assignment')
export class AssignmentEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  assignmentId: number;

  @Column({ name: 'title', type: 'varchar', length: 200 })
  title: string;

  @Column({ name: 'dateUploaded', type: 'date' })
  uploadedDate: Date;

  @Column({name: 'assignmentFile', type: 'varchar', length: 200})
  assignmentFile: string;


  @ManyToOne(() => CourseEntity, (course) => course.assignments)
  course: CourseEntity;
}
