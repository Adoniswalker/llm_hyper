import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  sessionId!: string;

  @Column()
  role!: string;

  @Column("text")
  content!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
