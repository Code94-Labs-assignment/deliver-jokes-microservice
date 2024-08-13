import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Joke } from '../entities/joke';
import { HttpService } from '@nestjs/axios';
import { appConfig } from '../../config/appConfig';

@Injectable()
export class JokesService {
  private readonly logger = new Logger(JokesService.name);

  constructor(
    @InjectRepository(Joke)
    private jokesRepository: Repository<Joke>,
    private readonly httpService: HttpService
  ) {}

  async getRandomJoke(type?: string): Promise<Joke> {
    this.logger.log(`Service - getRandomJoke: Start - type: ${type}`);
    try {
      const jokes = type
        ? await this.jokesRepository.find({ where: { type } })
        : await this.jokesRepository.find();
      const randomIndex = Math.floor(Math.random() * jokes.length);
      const joke = jokes[randomIndex];
      this.logger.log(
        `Service - getRandomJoke: Success - ${JSON.stringify(joke)}`
      );
      return joke;
    } catch (error) {
      this.logger.error(`Service - getRandomJoke: Error - ${error.message}`);
      throw new Error('Failed to fetch a random joke');
    }
  }

  async getJokeTypes(): Promise<string[]> {
    this.logger.log('Service - getJokeTypes: Start');
    try {
      const response = await this.httpService
        .get(`${appConfig.submitServiceUrl}/types`)
        .toPromise();
      const jokeTypes = response.data;
      this.logger.log(
        `Service - getJokeTypes: Success - ${JSON.stringify(jokeTypes)}`
      );
      return jokeTypes;
    } catch (error) {
      this.logger.error(`Service - getJokeTypes: Error - ${error.message}`);
      throw new Error('Failed to fetch joke types');
    }
  }

  async saveAndApproveJoke(jokeData: Joke): Promise<Joke> {
    this.logger.log(
      `Service - saveAndApproveJoke: Start - ${JSON.stringify(jokeData)}`
    );
    try {
      const savedJoke = await this.jokesRepository.save(jokeData);
      this.logger.log(
        `Service - saveAndApproveJoke: Success - ${JSON.stringify(savedJoke)}`
      );
      return savedJoke;
    } catch (error) {
      this.logger.error(
        `Service - saveAndApproveJoke: Error - ${error.message}`
      );
      throw new Error('Failed to save and approve joke');
    }
  }
}
