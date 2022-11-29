import { useEffect, useState } from 'react';
import './App.css';

export const App = () => {

  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3001");
    console.log(response);
    const data = await response.json();
    console.log(data);
    setData(data?.message);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {data}
        </a>
      </header>
    </div>
  );
};
