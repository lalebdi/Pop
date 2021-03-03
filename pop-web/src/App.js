import React from 'react';
import './App.css';
import { TweetList } from './tweets'



function App() {
  

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <TweetList />
        </div>
      </header>
    </div>
  );
}

export default App;
