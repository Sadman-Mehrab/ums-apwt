import { StudentEntity } from 'src/student/entities/student.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('assignment')
export class AssignmentEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 200 })
  title: string;

  @Column({ name: 'dateUploaded', type: 'date' })
  dateUploaded: Date;

  @Column({name: 'assignmentFile', type: 'varchar', length: 200})
  assignmentFile: string;

  @ManyToOne(() => StudentEntity, (student) => student.assignments)
  student: StudentEntity;
}
