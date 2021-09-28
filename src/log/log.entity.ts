import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Log extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deviceId: number;

  @Column()
  value: string;

  @CreateDateColumn()
  createdAt: Date;

}
