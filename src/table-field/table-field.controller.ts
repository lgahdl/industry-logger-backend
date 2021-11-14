import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TableFieldService } from './table-field.service';
import { CreateTableFieldDto } from './dto/create-table-field.dto';
import { UpdateTableFieldDto } from './dto/update-table-field.dto';

@Controller('table-field')
export class TableFieldController {
  constructor(private readonly tableFieldService: TableFieldService) {}

  @Post()
  create(@Body() createTableFieldDto: CreateTableFieldDto) {
    return this.tableFieldService.create(createTableFieldDto);
  }

  @Get('/table/:idTable')
  findByIdTable(@Param('idTable') idTable: string) {
    return this.tableFieldService.findByIdTable(+idTable);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableFieldService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableFieldDto: UpdateTableFieldDto) {
    return this.tableFieldService.update(+id, updateTableFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableFieldService.remove(+id);
  }
}
