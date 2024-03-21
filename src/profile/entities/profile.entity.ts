import { FacultyEntity } from 'src/faculty/entities/faculty.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn  } from 'typeorm';

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'biography', type: 'varchar', length: 2000 })
  biography: string;

  @Column({
    name: 'researchInterests',
    type: 'varchar',
    length: 1000,
    array: true,
  })
  researchInterests: string[];


  @OneToOne(() => FacultyEntity, (faculty) => faculty.profile)
  @JoinColumn()
  faculty: FacultyEntity;
}
