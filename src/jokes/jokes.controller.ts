import { Controller, Get, Query } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
@ApiTags('jokes')
@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @ApiOperation({ summary: 'Get a random joke' })
  @ApiQuery({ name: 'type', required: false, description: 'The type of joke' })
  @Get('random')
  getRandomJoke(@Query('type') type?: string) {
    return this.jokesService.getRandomJoke(type);
  }

  @ApiOperation({ summary: 'Get all joke types' })
  @Get('types')
  getJokeTypes() {
    return this.jokesService.getJokeTypes();
  }
}
