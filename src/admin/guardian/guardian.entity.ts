import {  BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
 
 
@Entity("guardian")

export class Guardian {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    age: number;
    
  }
  