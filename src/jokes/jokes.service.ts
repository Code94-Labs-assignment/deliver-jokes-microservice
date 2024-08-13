import { Injectable } from '@nestjs/common';

@Injectable()
export class JokesService {
  private jokes = [
    {
      id: 1,
      type: 'Programming',
      setup: 'Why do programmers prefer dark mode?',
      punchline: 'Because the light attracts bugs!'
    },
    {
      id: 2,
      type: 'Dad Jokes',
      setup: "Why don't skeletons fight each other?",
      punchline: "They don't have the guts."
    },
    {
      id: 3,
      type: 'Knock-Knock',
      setup: 'Knock knock.',
      punchline:
        "Who's there? Broken pencil. Broken pencil who? Never mind, it's pointless."
    }
  ];

  getRandomJoke(type?: string) {
    const jokes = type
      ? this.jokes.filter((joke) => joke.type === type)
      : this.jokes;
    const randomIndex = Math.floor(Math.random() * jokes.length);
    return jokes[randomIndex];
  }

  getJokeTypes() {
    return [...new Set(this.jokes.map((joke) => joke.type))];
  }
}
