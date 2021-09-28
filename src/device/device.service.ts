import { Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './device.entity';

@Injectable()
export class DeviceService {
  async create(createDeviceDto: CreateDeviceDto) {
    const device = this.mount(createDeviceDto);
    const savedDevice = await Device.save(device);
    return this.findOne(savedDevice.id);
  }

  findAll() {
    return Device.find();
  }

  findOne(id: number) {
    return Device.findOne(id);
  }

  async update(id: number, updateDeviceDto: UpdateDeviceDto) {
    const device = this.mount(updateDeviceDto);
    device.id = id;
    await Device.save(device);
    return this.findOne(id);
  }

  async remove(id: number) {
    const device = await this.findOne(id);
    await Device.remove(device);
  }

  private mount(dto: CreateDeviceDto | UpdateDeviceDto): Device {
    const device = new Device();
    device.name = dto?.name;
    device.macAddress = dto?.macAddress;
    return device;
  }
}
