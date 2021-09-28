import { Module } from '@nestjs/common';
import * as path from 'path';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createDatabaseIfDoesntExist } from './database.helpers';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const socketPath = configService.get('MYSQL_SOCKET');
        const host = configService.get('MYSQL_HOST');
        const port = parseInt(configService.get('MYSQL_PORT'), 10);
        const user = configService.get('MYSQL_USER');
        const password = configService.get('MYSQL_PASS');
        const database = configService.get('MYSQL_DATABASE');

        await createDatabaseIfDoesntExist(
          socketPath,
          host,
          port,
          user,
          password,
          database,
        );

        const objToReturn: TypeOrmModuleOptions = {
          type: 'mysql',
          username: user,
          password,
          database,
          entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
          synchronize: false,
          migrations: [path.join(__dirname, '/migrations/*{.ts,.js}')],
          migrationsRun: true,
          extra: {
            charset: 'utf8mb4_unicode_ci',
          },
          logging: ['error'],
        };

        if (socketPath) {
          return {
            ...objToReturn,
            extra: {
              socketPath,
            },
          };
        }
        return {
          ...objToReturn,
          host,
          port,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
