import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
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

  @Get(':macAddress/last')
  findOne(@Param('macAddress') macAddress: string) {
    return this.logService.findLast(macAddress);
  }

  @Get(':macAddress/')
  findAll(@Param('macAddress') macAddress: string, @Query() query) {
    let { initialDate, finalDate } = query;
    if (!initialDate) {
      initialDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }
    if (!finalDate) {
      finalDate = Date.now();
    }
    return this.logService.findAll(
      macAddress,
      new Date(initialDate),
      new Date(finalDate),
    );
  }

  @Delete(':macAddress')
  remove(@Param('macAddress') macAddress: string, @Query() query) {
    const { finalDate } = query;
    return this.logService.remove(macAddress, new Date(finalDate));
  }
}
