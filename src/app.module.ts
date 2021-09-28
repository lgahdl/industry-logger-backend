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

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    LogModule,
    DeviceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
