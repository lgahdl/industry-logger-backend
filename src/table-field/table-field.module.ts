import { Module } from '@nestjs/common';
import { TableFieldService } from './table-field.service';
import { TableFieldController } from './table-field.controller';

@Module({
  controllers: [TableFieldController],
  providers: [TableFieldService]
})
export class TableFieldModule {}
