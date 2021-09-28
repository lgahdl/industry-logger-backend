import * as fs from 'fs';
import * as mysql from 'mysql2/promise';
import * as path from 'path';

interface IInitializeDbProps {
  socketPath: string;
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export const createDatabaseIfDoesntExist = async (
  socketPath: string,
  host: string,
  port: number,
  user: string,
  password: string,
  database: string,
) => {
  const connectionParams: Partial<IInitializeDbProps> = {
    user,
    password,
  };
  if (socketPath) connectionParams.socketPath = socketPath;
  else {
    connectionParams.host = host;
    connectionParams.port = port;
  }
  const connection = await mysql.createConnection(connectionParams);
  await connection.execute(`CREATE DATABASE IF NOT EXISTS ${database};`);
  connection.destroy();
};

export const readSqlFile = (filepath: string): string[] => {
  const fileContent = fs
    .readFileSync(path.join(__dirname, filepath))
    .toString();
  const removedComments = fileContent
    .split(/\r?\n|\r/g)
    .filter((obj) => !obj.startsWith('--'));
  return removedComments
    .join(' ')
    .split(';')
    .filter((query) => query?.length && query !== ' ');
};
