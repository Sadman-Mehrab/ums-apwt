import { FacultyEntity } from 'src/faculty/entities/faculty.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'title', type: 'varchar', length: 200 })
  title: string;

  @Column({name: 'datePublished', type:'date'})
  date: Date;

  @ManyToOne(() => FacultyEntity, (faculty) => faculty.articles)
  faculty: FacultyEntity;
}
