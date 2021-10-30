import { PartialType } from '@nestjs/mapped-types';
import { CreateTableFieldDto } from './create-table-field.dto';

export class UpdateTableFieldDto extends PartialType(CreateTableFieldDto) {
  id: number;
}
