import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Log } from './log.entity';
import { LessThan } from 'typeorm';

@Injectable()
export class LogService {
  async create(createLogDto: CreateLogDto) {
    const log = this.mount(createLogDto);
    const savedLog = await Log.save(log);
    return this.findOne(savedLog.macAddress);
  }

  async findOne(macAddress: string) {
    return Log.findOne({ where: { macAddress } });
  }

  async remove(macAddress: string, limitDate: Date) {
    const logs = await Log.find({ where: { createdAt: LessThan(limitDate), macAddress } });
    await Log.remove(logs);
  }

  private mount(dto: CreateLogDto | UpdateLogDto): Log {
    const log = new Log();
    log.macAddress = dto?.macAddress;
    log.value = dto?.value;
    return log;
  }
}
