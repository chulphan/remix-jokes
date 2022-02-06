import type { LinksFunction, LoaderFunction } from 'remix';
import { Outlet, Link, useLoaderData } from 'remix';
import { db } from '~/utils/db.server';
import stylesUrl from '../styles/jokes.css';

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: stylesUrl
    }
  ]
}

type JokesSelect = {
  id: boolean;
  name: boolean;
}

type LoaderData = {
  jokeListItems: Array<{ id: string; name: string }>;
}

export const loader: LoaderFunction = async () => {
  const select: JokesSelect = {id: true, name: true}
  const data: LoaderData = {
    jokeListItems: await db.joke.findMany({
      take: 5,
      select,
      orderBy: { createdAt: 'desc' }
    })
  };

  return data;
}

// /jokes 로 통하는 라우팅의 부모 라우팅이 된다는 듯
export default function JokesRoute() {
  const data = useLoaderData<LoaderData>();
  console.log('data ', data);
  
  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
          <h1 className="home-link">
            <Link
              to={'/'}
              title={'Remix Jokes'}
              aria-label={'Remix Jokes'}
            >
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
            <Link to={'.'}>Get a Random Joke</Link>
            <p>Here are a few more jokes to check out:</p>
            <ul>
              {
                data.jokeListItems.map(joke => (
                  <li key={joke.id}>
                    <Link to={joke.id}>{joke.name}</Link>
                  </li>
                ))
              }
            </ul>
            <Link to={'new'} className="button">
              Add your own
            </Link>
          </div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}