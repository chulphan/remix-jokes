import { Link, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { db } from '~/utils/db.server';
import { Joke } from '@prisma/client';

type LoaderData = { randomJoke: Joke };

export const loader: LoaderFunction = async () => {
  const count = await db.joke.count();
  const randomRowNumber = Math.floor(Math.random() * count);

  const [randomJoke] = await db.joke.findMany({
    take: 1,
    skip: randomRowNumber
  });

  return {randomJoke};
}

export default function JokesIndexRoute() {
  const data = useLoaderData<LoaderData>()
  const { randomJoke } = data;

  return (
    <div>
      <p>Here's a random joke: </p>
      <p>{randomJoke.content}</p>
      <Link to={randomJoke.id}>
        "{randomJoke.name}" Permalink
      </Link>
    </div>
  )
}