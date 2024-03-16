import { SectionEntity } from 'src/section/entities/section.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinTable } from 'typeorm';

@Entity('faculty')
export class FacultyEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'userName', type: 'varchar', length: 100, unique: true })
  userName: string;

  @Column({ name: 'email', type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 100 })
  password: string;

  @Column({ name: 'fullName', type: 'varchar', length: 100 })
  fullName: string;

  @Column({ name: 'dateOfBirth', type: 'date' })
  dateOfBirth: Date;

  @Column({ name: 'joiningDate', type: 'date' })
  joiningDate: Date;

  @Column({ name: 'designation', type: 'varchar', length: 100 })
  designation: string;

  @Column({
    nullable: true,
    name: 'profilePhoto',
    type: 'varchar',
    length: 500,
  })
  profilePhoto: string;

  @Column({ nullable: true, name: 'salary', type: 'int' })
  salary: number;

  @OneToMany(() => SectionEntity, (section) => section.faculty)
  sections: SectionEntity[];
}
