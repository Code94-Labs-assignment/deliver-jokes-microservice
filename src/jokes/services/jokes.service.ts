import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Joke } from '../entities/joke';
import { log } from 'console';

@Injectable()
export class JokesService {
  constructor(
    @InjectRepository(Joke)
    private jokesRepository: Repository<Joke>
  ) {}

  async getRandomJoke(type?: string): Promise<Joke> {
    const jokes = type
      ? await this.jokesRepository.find({ where: { type } })
      : await this.jokesRepository.find();
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
  }

  async getJokeTypes(): Promise<string[]> {
    const jokes = await this.jokesRepository.find();
    Logger.debug(JSON.stringify(jokes));
    const jokeTypes = jokes.map((joke) => joke.type);
    return [...new Set(jokeTypes)];
  }
}
