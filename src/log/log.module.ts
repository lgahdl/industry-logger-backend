import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { DeviceService } from '../device/device.service';

@Module({
  controllers: [LogController],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
