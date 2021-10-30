import { Injectable } from '@nestjs/common';
import { CreateTableFieldDto } from './dto/create-table-field.dto';
import { UpdateTableFieldDto } from './dto/update-table-field.dto';
import { UpdateTableDto } from '../table/dto/update-table.dto';
import { CreateTableDto } from '../table/dto/create-table.dto';
import { Table } from '../table/table.entity';
import { TableField } from './table-field.entity';

@Injectable()
export class TableFieldService {
  async create(createTableFieldDto: CreateTableFieldDto) {
    const tableField = this.mount(createTableFieldDto);
    const savedTableField = await TableField.save(tableField);
    return this.findOne(savedTableField.id);
  }

  findByIdTable(idTable: number) {
    return TableField.find({ where: { idTable } });
  }

  findOne(id: number) {
    return TableField.findOne(id);
  }

  async update(id: number, updateTableFieldDto: UpdateTableFieldDto) {
    const tableField = this.mount(updateTableFieldDto);
    tableField.id = id;
    await TableField.save(tableField);
    return this.findOne(id);
  }

  async remove(id: number) {
    await TableField.delete(id);
  }

  mount(dto: UpdateTableFieldDto | CreateTableFieldDto): TableField {
    const tableField = new TableField();
    tableField.idTable = dto?.idTable;
    tableField.name = dto?.name;
    tableField.description = dto?.description;
    tableField.append = dto?.append;
    tableField.prepend = dto?.prepend;
    tableField.logDigit = dto?.logDigit;
    tableField.type = dto?.type;
    tableField.decimalDigits = dto?.decimalDigits;
    tableField.createdAt = dto?.createdAt;
    tableField.updatedAt = dto?.updatedAt;
    return tableField;
  }
}
