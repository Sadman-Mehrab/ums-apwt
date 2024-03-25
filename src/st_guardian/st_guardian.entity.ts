import { Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { StudentEntity } from './student.entity';

@Entity("st_guardian")
export class St_GuardianEntity{

@PrimaryGeneratedColumn()
id: number;

@Column({type: 'varchar', length: 150})
firstname: string;

@Column({type: 'varchar', length: 150 })
lastname: string;

@Column({type: 'varchar', length: 150 })
childname: string;

@Column({unique:true})
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({type: 'varchar', length:20, unique:true})
  phoneNo: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column()
    filename: string;

    
    @OneToMany(() => StudentEntity, student => student.guardian)
  students: StudentEntity[];

}
  /*
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
    */


/*
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
  */
