import {
  LiveReload,
} from "remix";
import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Remix: So great, it's funny!</title>
      </head>
      <body>
        Hello world
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
