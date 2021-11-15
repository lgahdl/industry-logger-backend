import { TableFieldInfoDto } from './table-field-info.dto';

export class TableInfoDto {
  id: number;
  name: string;
  description: string;
  idDevice: number;
  createdAt: Date;
  updatedAt: Date;
  tableFields: TableFieldInfoDto[];
}
