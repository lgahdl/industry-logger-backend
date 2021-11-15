import { TypeEnum } from '../../enums';

export class TableFieldInfoDto {
  id: number;
  idTable: number;
  name: string;
  description: string;
  append: string;
  prepend: string;
  logDigit: number;
  decimalDigits: number;
  type: TypeEnum;
  createdAt: Date;
  updatedAt: Date;
  values: number | string[];
  dates: Date[];
  alarms: Date[];
}
