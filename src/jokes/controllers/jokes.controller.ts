import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { JokesService } from '../services/jokes.service';
import { ApiTags, ApiOperation, ApiQuery, ApiBody } from '@nestjs/swagger';
import { Joke } from '../entities/joke';
import { Logger } from '@nestjs/common';

@ApiTags('Deliver jokes')
@Controller('api/Deliver-jokes')
export class JokesController {
  private readonly logger = new Logger(JokesController.name);

  constructor(private readonly jokesService: JokesService) {}

  @ApiOperation({ summary: 'Get a random joke' })
  @ApiQuery({ name: 'type', required: false, description: 'The type of joke' })
  @Get('random')
  async getRandomJoke(@Query('type') type?: string) {
    this.logger.log(`Controller - getRandomJoke: Start - type: ${type}`);
    try {
      const joke = await this.jokesService.getRandomJoke(type);
      const response = {
        statusCode: 200,
        message: 'Random joke fetched successfully',
        data: joke
      };
      this.logger.log(
        `Controller - getRandomJoke: Success - ${JSON.stringify(response)}`
      );
      return response;
    } catch (error) {
      this.logger.error(`Controller - getRandomJoke: Error - ${error.message}`);
      return {
        statusCode: 500,
        message: 'Failed to fetch a random joke',
        error: error.message
      };
    }
  }

  @ApiOperation({ summary: 'Get all joke types' })
  @Get('types')
  async getJokeTypes() {
    this.logger.log(`Controller - getJokeTypes: Start`);
    try {
      const jokeTypes = await this.jokesService.getJokeTypes();
      const response = {
        statusCode: 200,
        message: 'Joke types fetched successfully',
        data: jokeTypes
      };
      this.logger.log(`Controller - getJokeTypes: Success - ${response}}`);
      return response;
    } catch (error) {
      this.logger.error(`Controller - getJokeTypes: Error - ${error.message}`);
      return {
        statusCode: 500,
        message: 'Failed to fetch joke types',
        error: error.message
      };
    }
  }

  @ApiOperation({ summary: 'Save and approve a new joke' })
  @ApiBody({
    type: Joke,
    description: 'The joke to save and approve',
    examples: {
      aJoke: {
        summary: 'A sample joke',
        value: {
          setup: 'Why did the chicken cross the road?',
          punchline: 'To get to the other side!',
          type: 'Programming',
          author: 'Anonymous'
        }
      }
    }
  })
  @Post('approve')
  async saveAndApproveJoke(@Body() jokeData: Joke) {
    this.logger.log(
      `Controller - saveAndApproveJoke: Start - ${JSON.stringify(jokeData)}`
    );
    try {
      const joke = await this.jokesService.saveAndApproveJoke(jokeData);
      const response = {
        statusCode: 201,
        message: 'Joke saved and approved successfully',
        data: joke
      };
      this.logger.log(
        `Controller - saveAndApproveJoke: Success - ${JSON.stringify(response)}`
      );
      return response;
    } catch (error) {
      this.logger.error(
        `Controller - saveAndApproveJoke: Error - ${error.message}`
      );
      return {
        statusCode: 500,
        message: 'Failed to save and approve joke',
        error: error.message
      };
    }
  }
}
