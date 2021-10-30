import { Test, TestingModule } from '@nestjs/testing';
import { TableFieldService } from './table-field.service';

describe('TableFieldService', () => {
  let service: TableFieldService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableFieldService],
    }).compile();

    service = module.get<TableFieldService>(TableFieldService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
