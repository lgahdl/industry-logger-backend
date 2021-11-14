import { Module } from '@nestjs/common';
import { TableFieldService } from './table-field.service';
import { TableFieldController } from './table-field.controller';
import { TableService } from '../table/table.service';

@Module({
  controllers: [TableFieldController],
  providers: [TableFieldService],
  exports: [TableFieldService],
})
export class TableFieldModule {}
