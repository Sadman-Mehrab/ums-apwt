import { CourseEntity } from 'src/course/entities/course.entity';
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

  @Column({name: 'fullName', type: 'varchar', length: 100})
  fullName: string;

  @Column({name: 'email', type: 'varchar', length: 100, unique: true})
  email: string;
  
  @Column({name: 'program', type: 'varchar', length: 100})
  program: string;

  @Column({name: 'password', type: 'varchar', length: 100})
  password: string;

  @Column({name: 'fatherName', type: 'varchar', length: 100})
  fatherName: string;

  @Column({name: 'gender', type: 'varchar', length: 100})
  gender: string;

  @Column({name: 'dateOfBirth', type: 'date'})
  dateOfBirth: Date;

  @Column({name: 'address', type: 'varchar', length: 200})
  address: string;

  @Column({name: 'nationality', type: 'varchar', length: 50})
  nationality: string;

  @Column({name: 'religion', type: 'varchar', length: 50})
  religion: string;

  @Column({name: 'bloodGroup', type: 'varchar', length: 50})
  bloodGroup: string;

  @Column({name: 'phoneNumber', type: 'int'})
  phoneNumber: string;

  @Column({name: 'admissionDate', type: 'date'})
  admissionDate: Date;

  @Column({nullable: true, name: 'profilePicture', type: 'varchar', length: 500})
  profilePicture: string;


  @OneToMany(() => CourseEntity, (course) => course.student, {lazy: true})
  courses: Promise<CourseEntity[]>;
}
