import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Joke } from '../entities/joke';
import { HttpService } from '@nestjs/axios';
import { appConfig } from '../../config/appConfig';

@Injectable()
export class JokesService {
  constructor(
    @InjectRepository(Joke)
    private jokesRepository: Repository<Joke>,
    private readonly httpService: HttpService,
  ) {}

  async getRandomJoke(type?: string): Promise<Joke> {
    const jokes = type
      ? await this.jokesRepository.find({ where: { type } })
      : await this.jokesRepository.find();
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
  }

  async getJokeTypes(): Promise<string[]> {
    try {
      const response = await this.httpService.get(`${appConfig.submitServiceUrl}/types`).toPromise();
      Logger.debug(`Fetched joke types: ${JSON.stringify(response.data)}`);
      return response.data;
    } catch (error) {
      Logger.error(`Error fetching joke types: ${error.message}`);
      throw new Error('Failed to fetch joke types');
    }
  }

  async saveAndApproveJoke(jokeData: Joke): Promise<Joke> {
    return this.jokesRepository.save(jokeData);
  }
}
