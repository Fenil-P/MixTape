import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      searchResults: [],
      playlistName: `New Playlist`,
      playlistTracks: []
    };

    this.addTrack           = this.addTrack.bind(this);
    this.removeTrack        = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist       = this.savePlaylist.bind(this);
    this.search             = this.search.bind(this);

  }

  addTrack(track)
  {
    if(!this.state.playlistTracks.find(t => t.id === track.id))
    {
      let tempList = this.state.playlistTracks.slice();
      tempList.push(track);
      this.setState({ playlistTracks: tempList });
    }
  }

  removeTrack(track)
  {
    let tracks = this.state.playlistTracks
    console.log(tracks);
    tracks = tracks.filter(t => {return t.id != track.id});
    console.log(tracks);
    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(name)
  {
    this.setState({ playlistName: name });
  }

  savePlaylist()
  {
    const uris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, uris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      });
    });

  }

  search(term)
  {
    Spotify.search(term).then(results => this.setState({ searchResults: results }));
  }

  render()
  {
    return (
      <div>   
        <h1>Mix<span className="highlight1">T</span><span className="highlight2">T</span><span className="highlight3">T</span>ape</h1>
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
