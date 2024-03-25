import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { St_GuardianEntity } from './st_guardian.entity';

@Entity()
export class StudentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150 })
  firstname: string;

  @Column({ type: 'varchar', length: 150 })
  lastname: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  phoneno: string;

  @ManyToOne(() => St_GuardianEntity, guardian => guardian.students)
  guardian: St_GuardianEntity;
    

} 

