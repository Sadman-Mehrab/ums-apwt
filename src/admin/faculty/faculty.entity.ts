import {  BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
 
 
@Entity("faculty")

export class Faculty {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    age: number;
    
  }
  