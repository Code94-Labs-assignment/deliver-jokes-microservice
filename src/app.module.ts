import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JokesModule } from './jokes/jokes.module';
import { typeOrmConfig } from './database/typeorm.config';
import { appConfig } from './config/appConfig';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig]
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    JokesModule
  ]
})
export class AppModule {}
