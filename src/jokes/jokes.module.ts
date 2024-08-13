import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokesController } from './controllers/jokes.controller';
import { JokesService } from './services/jokes.service';
import { Joke } from './entities/joke';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Joke]), HttpModule],
  controllers: [JokesController],
  providers: [JokesService]
})
export class JokesModule {}
