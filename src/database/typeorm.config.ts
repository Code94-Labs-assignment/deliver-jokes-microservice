import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Joke } from '../jokes/entities/joke';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  url:
    process.env.MYSQL_URL ||
    'mysql://root:ZwmBvBUAYcMHONTBOIWMBnzjNJmesnrr@roundhouse.proxy.rlwy.net:36495/railway',
  entities: [Joke],
  synchronize: false
};
