import { Controller, Get, Query, Post, Body, Param } from '@nestjs/common';
import { JokesService } from '../services/jokes.service';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiBody,
  ApiParam
} from '@nestjs/swagger';
import { Joke } from '../entities/joke';

@ApiTags('Deliver jokes')
@Controller('api/Deliver-jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @ApiOperation({ summary: 'Get a random joke' })
  @ApiQuery({ name: 'type', required: false, description: 'The type of joke' })
  @Get('random')
  async getRandomJoke(@Query('type') type?: string) {
    try {
      const joke = await this.jokesService.getRandomJoke(type);
      return {
        statusCode: 200,
        message: 'Random joke fetched successfully',
        data: joke
      };
    } catch (error) {
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
    try {
      const jokeTypes = await this.jokesService.getJokeTypes();
      return {
        statusCode: 200,
        message: 'Joke types fetched successfully',
        data: jokeTypes
      };
    } catch (error) {
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
    try {
      const joke = await this.jokesService.saveAndApproveJoke(jokeData);
      return {
        statusCode: 201,
        message: 'Joke saved and approved successfully',
        data: joke,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Failed to save and approve joke',
        error: error.message,
      };
    }
  }
}
