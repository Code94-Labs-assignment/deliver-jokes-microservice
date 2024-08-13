import { EntityRepository, Repository } from 'typeorm';
import { Joke } from '../entities/joke';

@EntityRepository(Joke)
export class JokeRepository extends Repository<Joke> {

}
