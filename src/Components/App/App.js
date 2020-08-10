import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
// import Spotify from '../../util/Spotify.js';

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      searchResults: [{name:'a', artist: 'b', album: 'c'},{name:'aa', artist: 'b', album: 'c'},{name:'a', artist: 'b', album: 'c'}],
      playlistName: `New Playlist`,
      playlistTracks: []
    };

    this.addTrack           = this.addTrack.bind(this);
    this.removeTrack        = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist       = this.savePlaylist.bind(this);
    this.search             = this.search.bind(this);

    // Spotify.getAccessToken();
  }

  addTrack(track)
  {
    if(!this.state.playlistTracks.find(t => t.name === track.name))
    {
      let tempList = this.state.playlistTracks.slice();
      tempList.push(track);
      this.setState({ playlistTracks: tempList });
    }
  }

  removeTrack(track)
  {
    let tracks = this.state.playlistTracks
    tracks = tracks.filter(t => t.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name)
  {
    this.setState({ playlistName: name });
  }

  savePlaylist()
  {
    const uris = this.state.playlistTracks.map(track => track.uri);

    // Spotify.savePlaylist(this.state.playlistName, uris)
    //   .then(() =>
    //     {
    //       this.setState({ playlistTracks: [] })
    //     }
    //   );
  }

  search(term)
  {
    // Spotify.search(term).then(results => this.setState({ searchResults: results }));
  }

  render()
  {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
              isRemoval={false}
            />
            <Playlist
              playlistName={this.state.playlistName}
              onNameChange={this.updatePlaylistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
              isRemoval={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
