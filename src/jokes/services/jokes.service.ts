import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Joke } from '../entities/joke';
import { HttpService } from '@nestjs/axios';
import { appConfig } from '../../config/appConfig';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JokesService {
  private readonly logger = new Logger(JokesService.name);

  constructor(
    @InjectRepository(Joke)
    private jokesRepository: Repository<Joke>,
    private readonly configService: ConfigService,
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
      const submitServiceUrl =
        this.configService.get<string>('submitServiceUrl');
      this.logger.log(
        `Service - getJokeTypes: submitServiceUrl - ${submitServiceUrl}`
      );
      const response = await this.httpService
        .get(`${submitServiceUrl}/types`)
        .toPromise();

      const jokeTypes = response.data.data;
      this.logger.log(`Service - getJokeTypes: Success - ${jokeTypes}`);
      return jokeTypes;
    } catch (error) {
      this.logger.error(`Service - getJokeTypes: Error`, {
        message: error.message,
        stack: error.stack,
        config: error.config,
        code: error.code
      });

      if (error.response) {
        this.logger.error(
          `Service - getJokeTypes: Server responded with status code ${error.response.status}`,
          { data: error.response.data }
        );
        throw new Error(
          `Failed to fetch joke types: Server responded with status code ${error.response.status}`
        );
      } else if (error.request) {
        this.logger.error(
          'Service - getJokeTypes: No response received from server',
          { request: error.request }
        );
        throw new Error('Failed to fetch joke types: No response from server');
      } else {
        this.logger.error('Service - getJokeTypes: Request setup error', {
          message: error.message
        });
        throw new Error('Failed to fetch joke types: Request setup error');
      }
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
