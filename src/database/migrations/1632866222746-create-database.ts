import { MigrationInterface, QueryRunner } from 'typeorm';
import { readSqlFile } from '../database.helpers';

export class createDatabase1632866222746 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const queries = readSqlFile(
      '/migrations/seeds/1632866222746-create-database.sql',
    );
    console.log(queries);
    for (const query of queries) {
      await queryRunner.query(query);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA ${ process.env.MYSQL_DATABASE }`);
  }
}
