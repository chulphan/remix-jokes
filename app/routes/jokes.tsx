import { Outlet } from 'remix';

// /jokes 로 통하는 라우팅의 부모 라우팅이 된다는 듯
export default function JokesRoute() {
  return (
    <div>
      <h1>J🤪KES</h1>
      <main>
        <Outlet />
      </main>
    </div>
  )
}