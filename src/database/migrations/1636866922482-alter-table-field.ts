import {MigrationInterface, QueryRunner} from "typeorm";
import { readSqlFile } from '../database.helpers';

export class alterTableField1636866922482 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const queries = readSqlFile(
          '/migrations/seeds/1636866922482-alter-table-field.sql',
        );
        for (const query of queries) {
            await queryRunner.query(query);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
