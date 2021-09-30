import { MigrationInterface, QueryRunner } from 'typeorm';
import { readSqlFile } from '../database.helpers';

export class alterLog1633010157940 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const queries = readSqlFile(
      '/migrations/seeds/1633010157940-alter-log.sql',
    );
    for (const query of queries) {
      await queryRunner.query(query);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const queries = readSqlFile(
      '/migrations/seeds/1633010157940-alter-log(down).sql',
    );
    for (const query of queries) {
      await queryRunner.query(query);
    }
  }

}
