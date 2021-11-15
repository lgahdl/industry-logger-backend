import { Injectable } from '@nestjs/common';
import { DeviceService } from '../device/device.service';
import { LogService } from '../log/log.service';
import { TableService } from '../table/table.service';
import { TableFieldService } from '../table-field/table-field.service';
import { TableField } from '../table-field/table-field.entity';
import { Log } from '../log/log.entity';
import { TableFieldInfoDto } from './dto/table-field-info.dto';
import Utils from '../helpers/utils';
import { TableInfoDto } from './dto/table-info.dto';

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
      new Date(initialDate),
      new Date(finalDate),
    );
    console.log(logs);
    const tables = await this.tableService.findByIdDevice(device.id);
    deviceDto.tables = await Promise.all(
      tables.map(async (table) => {
        const tableFields = await this.tableFieldService.findByIdTable(
          table.id,
        );
        const tableFieldInfoDtos = tableFields.map((tableField) =>
          this.getTableFieldInfoDto(tableField, logs),
        );
        const tableDto: TableInfoDto = { ...table, tableFields: undefined };
        tableDto.tableFields = tableFieldInfoDtos;
        return tableDto;
      }),
    );
    deviceDto.logs = logs;
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
        console.log('v', value);
        binaryValue = value.substring(
          tableField.logDigit,
          tableField.logDigit + 16,
        );
        console.log('b', binaryValue);
        realValue = parseInt(binaryValue, 2);
        console.log('r', realValue);
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
        binaryValue = value.substring(
          tableField.logDigit,
          tableField.logDigit + 1,
        );
        realValue = binaryValue;
        valuesDesc.push(realValue);
        valuesCreatedAt.push(createdAt);
        if (tableField.type === 'ALARM' && parseInt(binaryValue) === 1) {
          alarms.push(createdAt);
        }
      }
    });
    return { ...dto, values: valuesDesc, dates: valuesCreatedAt, alarms };
  }
}
