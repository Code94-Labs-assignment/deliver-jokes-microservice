import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Joke } from '../jokes/entities/joke';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'jokes_db',
  entities: [Joke],
  synchronize: true
};
