import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  PrimaryColumn,
} from "typeorm";

@Entity("student")
export class Student extends BaseEntity {
  @PrimaryColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  gender!: string;

  @Column()
  address!: string;

  @Column()
  mobile!: string;

  @Column({ type: "date" })
  dob!: string;

  @Column()
  age!: number;
}
