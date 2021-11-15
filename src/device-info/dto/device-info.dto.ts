import { TableInfoDto } from './table-info.dto';

export class DeviceInfoDto {
  id: number;
  name: string;
  macAddress: string;
  createdAt: Date;
  updatedAt: Date;
  tables: TableInfoDto[];
}
