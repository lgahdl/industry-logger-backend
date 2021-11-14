import { Injectable } from '@nestjs/common';
import { DeviceService } from '../device/device.service';
import { LogService } from '../log/log.service';
import { TableService } from '../table/table.service';
import { TableFieldService } from '../table-field/table-field.service';
import { TableField } from '../table-field/table-field.entity';
import { Log } from '../log/log.entity';
import { TableFieldInfoDto } from './dto/table-field-info.dto';
import Utils from '../helpers/utils';

@Injectable()
export class DeviceInfoService {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly logService: LogService,
    private readonly tableService: TableService,
    private readonly tableFieldService: TableFieldService,
  ) {}

  async findByMacAddress(
    macAddress: string,
    initialDate: Date,
    finalDate: Date,
  ) {
    const device = await this.deviceService.findOneByMacAddress(macAddress);
    const deviceDto: any = { ...device };
    const logs = await this.logService.findAll(
      macAddress,
      initialDate,
      finalDate,
    );
    const tables = await this.tableService.findByIdDevice(device.id);
    const tableDtos = tables.map(async (table) => {
      const tableFields = await this.tableFieldService.findByIdTable(table.id);
      const tableFieldInfoDtos = tableFields.map((tableField) =>
        this.getTableFieldInfoDto(tableField, logs),
      );
      const tableDto: any = { ...table };
      tableDto.tableFields = tableFieldInfoDtos;
      return tableDto;
    });
    deviceDto.tables = tableDtos;
    return deviceDto;
  }

  private getTableFieldInfoDto(
    tableField: TableField,
    logs: Log[],
  ): TableFieldInfoDto {
    const dto = { ...tableField };
    const valuesDesc: number | string[] = [];
    const valuesCreatedAt: Date[] = [];
    const alarms: Date[] = [];
    logs.forEach(({ value, createdAt }) => {
      let binaryValue;
      let realValue;
      if (tableField.type === 'INTEGER') {
        binaryValue = value.substring(
          tableField.logDigit,
          tableField.logDigit + 16,
        );
        realValue = parseInt(binaryValue, 2);
        valuesDesc.push(realValue);
        valuesCreatedAt.push(createdAt);
      } else if (tableField.type === 'FLOAT') {
        binaryValue = value.substring(
          tableField.logDigit,
          tableField.logDigit + 16,
        );
        const integerValue = parseInt(binaryValue, 2);
        const zeroFilledIntegerValue = Utils.zeroFill(integerValue, 5);
        realValue = [
          zeroFilledIntegerValue.substring(0, 5 - tableField.decimalDigits),
          '.',
          zeroFilledIntegerValue.substring(5 - tableField.decimalDigits, 5),
        ].join('');
        valuesDesc.push(realValue);
        valuesCreatedAt.push(createdAt);
      } else if (tableField.type === 'BOOLEAN' || tableField.type === 'ALARM') {
        binaryValue = value.substring(tableField.logDigit, 1);
        realValue = binaryValue;
        valuesDesc.push(realValue);
        valuesCreatedAt.push(createdAt);
        if (tableField.type === 'ALARM' && !!binaryValue) {
          alarms.push(createdAt);
        }
      }
    });
    return { ...dto, values: valuesDesc, dates: valuesCreatedAt, alarms };
  }
}
