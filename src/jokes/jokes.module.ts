import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokesController } from './controllers/jokes.controller';
import { JokesService } from './services/jokes.service';
import { Joke } from './entities/joke';

@Module({
  imports: [TypeOrmModule.forFeature([Joke])],
  controllers: [JokesController],
  providers: [JokesService]
})
export class JokesModule {}
