import {  BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
 
 
@Entity("student")

export class Student {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    age: number;
    @Column()
    grade: string;
  }
  