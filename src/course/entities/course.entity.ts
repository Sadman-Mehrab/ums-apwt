import { SectionEntity } from 'src/section/entities/section.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('course')
export class CourseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'courseName', type: 'varchar', length: 100 })
  courseName: string;

  @Column({ name: 'department', type: 'varchar', length: 100 })
  department: string;

  @Column({ name: 'credit', type: 'int' })
  credit: number;

  @OneToMany(() => SectionEntity, (section) => section.course, { eager: true })
  sections: SectionEntity[];
}
