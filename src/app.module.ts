import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JokesModule } from './jokes/jokes.module';
import { typeOrmConfig } from './database/typeorm.config';
@Module({
  imports: [
    ConfigModule.forRoot(), // Automatically loads .env file
    TypeOrmModule.forRoot(typeOrmConfig),
    JokesModule
  ]
})
export class AppModule {}
