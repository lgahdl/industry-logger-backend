import { Injectable } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from './table.entity';

@Injectable()
export class TableService {
  async create(createTableDto: CreateTableDto) {
    const table = this.mount(createTableDto);
    const savedTable = await Table.save(table);
    return this.findOne(savedTable.id);
  }

  findAll() {
    return Table.find();
  }

  findOne(id: number) {
    return Table.findOne(id);
  }

  async update(id: number, updateTableDto: UpdateTableDto) {
    const table = this.mount(updateTableDto);
    table.id = id;
    await Table.save(table);
    return this.findOne(id);
  }

  async remove(id: number) {
    await Table.delete(id);
  }

  mount(dto: UpdateTableDto | CreateTableDto): Table {
    const table = new Table();
    table.name = dto?.name;
    table.description = dto?.description;
    table.idDevice = dto?.idDevice;
    table.createdAt = dto?.createdAt;
    table.updatedAt = dto?.updatedAt;
    return table;
  }
}
