import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TypeEnum } from '../enums';

@Entity()
export class TableField extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idTable: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  append: string;

  @Column()
  prepend: string;

  @Column()
  logDigit: number;

  @Column()
  decimalDigits: number;

  @Column({
    type: 'enum',
    enum: TypeEnum,
    default: TypeEnum.INTEGER,
  })
  type: TypeEnum;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
