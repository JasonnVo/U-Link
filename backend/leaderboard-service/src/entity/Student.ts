import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ unique: true })
  name!: string;

  @Column("int") rides!: number;

  @Column("int") points!: number;
}
