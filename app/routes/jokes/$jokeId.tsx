import type { LoaderFunction } from 'remix';
import { Link, useLoaderData } from 'remix';
import type { Joke } from '@prisma/client';
import { db } from '~/utils/db.server';

type useLoaderData = {
  joke: Joke
}

export const loader: LoaderFunction = async ({params}) => {
  const {jokeId} = params;
  const joke = await db.joke.findUnique({
    where: {
      id: jokeId
    }
  });
  if (!joke) throw new Error('Joke not found');
  const data: useLoaderData = {joke};

  return data;
}

export default function JokeRoute() {
  const data = useLoaderData<useLoaderData>();
  const {joke} = data;

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{joke.content}</p>
      <Link to={'.'}>{joke.name} Permalink</Link>
    </div>
  )
}