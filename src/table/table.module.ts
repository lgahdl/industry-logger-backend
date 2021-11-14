import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { TableController } from './table.controller';
import { LogService } from '../log/log.service';

@Module({
  controllers: [TableController],
  providers: [TableService],
  exports: [TableService],
})
export class TableModule {}
