import { Controller, Get, Param, Query } from '@nestjs/common';
import { DeviceInfoService } from './device-info.service';

@Controller('device-info')
export class DeviceInfoController {
  constructor(private readonly deviceInfoService: DeviceInfoService) {}

  @Get('/:macAddress/')
  findByMacAddress(@Param('macAddress') macAddress: string, @Query() query) {
    let { initialDate, finalDate } = query;
    if (!initialDate) {
      initialDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }
    if (!finalDate) {
      finalDate = Date.now();
    }
    return this.deviceInfoService.findByMacAddress(
      macAddress,
      initialDate,
      finalDate,
    );
  }
}
