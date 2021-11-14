import { Module } from '@nestjs/common';
import { DeviceInfoService } from './device-info.service';
import { DeviceInfoController } from './device-info.controller';
import { DeviceModule } from '../device/device.module';
import { TableModule } from '../table/table.module';
import { TableFieldModule } from '../table-field/table-field.module';
import { LogModule } from '../log/log.module';
import { HelpersModule } from '../helpers/helpers.module';

@Module({
  imports: [
    DeviceModule,
    TableModule,
    TableFieldModule,
    LogModule,
    HelpersModule,
  ],
  controllers: [DeviceInfoController],
  providers: [DeviceInfoService],
})
export class DeviceInfoModule {}
