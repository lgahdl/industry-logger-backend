import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Log } from './log.entity';
import { Between, LessThan } from 'typeorm';

@Injectable()
export class LogService {
  async create(createLogDto: CreateLogDto) {
    const log = this.mount(createLogDto);
    const savedLog = await Log.save(log);
    return this.findLast(savedLog.macAddress);
  }

  async findAll(macAddress: string, initialDate: Date, finalDate: Date) {
    return Log.find({
      where: { createdAt: Between(initialDate, finalDate), macAddress: macAddress.toLowerCase() },
      order: { createdAt: 'DESC' },
    });
  }

  async findLast(macAddress: string) {
    return Log.findOne({ where: { macAddress }, order: { createdAt: 'DESC' } });
  }

  async remove(macAddress: string, limitDate: Date) {
    const logs = await Log.find({
      where: { createdAt: LessThan(limitDate), macAddress },
    });
    await Log.remove(logs);
  }

  private mount(dto: CreateLogDto | UpdateLogDto): Log {
    const log = new Log();
    log.macAddress = dto?.macAddress;
    log.value = dto?.value;
    return log;
  }
}
