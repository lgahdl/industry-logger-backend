import { TableInfoDto } from './table-info.dto';
import { Log } from '../../log/log.entity';

export class DeviceInfoDto {
  id: number;
  name: string;
  macAddress: string;
  createdAt: Date;
  updatedAt: Date;
  tables: TableInfoDto[];
  logs: Log[];
}
