import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logService.create(createLogDto);
  }

  @Get(':macAddress')
  findOne(@Param('macAddress') macAddress: string) {
    return this.logService.findOne(macAddress);
  }

  @Delete(':macAddress')
  remove(@Param('macAddress') macAddress: string, @Query() query) {
    const { limitDate } = query;
    return this.logService.remove(macAddress, new Date(limitDate));
  }
}
