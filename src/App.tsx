import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          This is an example of a change in code that can be validated in a testing framework in a CI pipeline
        </p>
        <small>
          <a href="https://www.linkedin.com/posts/daniel-wh_github-daniel-whcommithashdeploy-activity-7213178505499475968-JjVs?utm_source=share&utm_medium=member_desktop" target="_blank">
            LinkedIn Post about this
          </a>
        </small>
      </div>
      <div className="card">
        <button name='count' onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
