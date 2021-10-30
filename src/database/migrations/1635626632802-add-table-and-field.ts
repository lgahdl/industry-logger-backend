import { MigrationInterface, QueryRunner } from 'typeorm';
import { readSqlFile } from '../database.helpers';

export class addTableAndField1635626632802 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queries = readSqlFile(
      '/migrations/seeds/1635626632802-add-table-and-field.sql',
    );
    for (const query of queries) {
      await queryRunner.query(query);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
