import React from 'react';
// import logo from './logo.svg';
import './App.css';

import SearchBar from  '../../Components/SearchBar/SearchBar';
import SearchResults from '../../Components/SearchResults/SearchResults';
import Playlist  from '../../Components/Playlist/Playlist';


function App() {
  return (
    <div>
      <h1>Mix<span className="highlight1">T</span><span className="highlight2">T</span><span className="highlight3">T</span>ape</h1>
      <div className="App">
        <SearchBar/>
        <div className="App-playlist">
          <SearchResults />
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;
