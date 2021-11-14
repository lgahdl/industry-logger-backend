import {
  Module,
  NestModule,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { LogModule } from './log/log.module';
import { DeviceModule } from './device/device.module';
import { TableModule } from './table/table.module';
import { TableFieldModule } from './table-field/table-field.module';
import { DeviceInfoModule } from './device-info/device-info.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    LogModule,
    DeviceModule,
    TableModule,
    TableFieldModule,
    DeviceInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
