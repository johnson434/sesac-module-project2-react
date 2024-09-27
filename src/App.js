import logo from './logo.svg';
import './App.css';
import axios from "axios";
import React, { useState } from 'react';

const URL = "http://test.com/api"

function App() {
  const [apiStatusCode, setApiStatusCode] = useState();

  const getRoot = async () => {
    axios.get(URL).then((response) => {
      setApiStatusCode(response.status);
    }).catch((reason) => {
      console.log("catch문");
      console.log(reason);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <button onClick={getRoot}>request 버튼</button>
          <span>response status code: {apiStatusCode}</span>
        </div>
      </header>
    </div>
  );
}

export default App;
