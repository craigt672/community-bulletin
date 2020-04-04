import React from 'react';

import logo from './logo.svg';
import './App.css';

import { useData } from './api';

function App() {
  const data = useData();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {data}
        </p>
      </header>
    </div>
  );
}

export default App;
