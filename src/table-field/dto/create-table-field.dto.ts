import { TypeEnum } from '../../enums';

export class CreateTableFieldDto {
  idTable: number;
  name: string;
  description: string;
  append: string;
  prepend: string;
  logDigit: number;
  type: TypeEnum;
  decimalDigits: number;
  createdAt: Date;
  updatedAt: Date;
}
