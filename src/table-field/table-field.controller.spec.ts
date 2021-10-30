import { Test, TestingModule } from '@nestjs/testing';
import { TableFieldController } from './table-field.controller';
import { TableFieldService } from './table-field.service';

describe('TableFieldController', () => {
  let controller: TableFieldController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableFieldController],
      providers: [TableFieldService],
    }).compile();

    controller = module.get<TableFieldController>(TableFieldController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
