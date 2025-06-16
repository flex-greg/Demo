import { styled } from "@linaria/react";
import { useState } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import { Button } from "./components/button";
import { TextInput } from "./components/input";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button variant="primary" onClick={() => setCount((count) => count - 1)}>
          Minus 1
        </Button>
        count is {count}
        <Button variant="secondary" rounded onClick={() => setCount((count) => count + 1)}>
          Add 1
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <Form>
          <TextInput type="text" label="Name" description="Enter your name" />
          <TextInput type="password" label="Password" description="Enter your password" />
          <Button type="submit" onClick={() => {}}>
            Submit
          </Button>
        </Form>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;

const Form = styled.form`
  max-width: 500px;
`;
