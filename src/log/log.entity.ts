import { BaseEntity, Column, CreateDateColumn, PrimaryColumn } from 'typeorm';

export class Log extends BaseEntity {

  @PrimaryColumn()
  macAddress: string;

  @Column()
  value: string;

  @CreateDateColumn()
  createdAt: Date;

}
