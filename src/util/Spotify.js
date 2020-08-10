const config = require('../.config.json');

const clientID = config.clientID;
const redirectURI = config.redirectURI;

let accessToken, expiresIn;

const Spotify = {

  getAccessToken()
  {
    if(accessToken)
      return accessToken;
    else if(window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/))
    {
      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

      window.setTimeout(() => accessToken = '', expiresIn*1000);
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    }
    else
    {
      let url = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = url;
    }
  },

  search(term)
  {
    const searchURL = `https://api.spotify.com/v1/search?type=track&q=${term}&limit=12`;
    return fetch(searchURL, {headers: {Authorization: `Bearer ${accessToken}`}})
      .then(response => response.json())
        .then(jsonResponse =>
          {
            if(jsonResponse.tracks)
            {
              return jsonResponse.tracks.items.map(track =>
                {
                  return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                  };
                }
              );
            }
            else
              return [];
          }
        );
  },

  savePlaylist(playlistName, trackURIs)
  {
    if(!(playlistName && trackURIs))
      return;

    let header = { Authorization: `Bearer ${accessToken}` };

    fetch(`https://api.spotify.com/v1/me`, { headers: header })
      .then(response => response.json())
        .then(jsonResponse =>
          {
            if(!jsonResponse.id)
              return;

            let userID = jsonResponse.id;

            fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
              {
                headers: header,
                method: `POST`,
                body: JSON.stringify({ name: playlistName })
              }
            )
              .then(response => response.json())
                .then(jsonResponse =>
                  {
                    if(!jsonResponse.id)
                      return;

                    let playlistID = jsonResponse.id

                    fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                      {
                        headers: header,
                        method: `POST`,
                        body: JSON.stringify({ uris: trackURIs })
                      }
                    );
                  }
                );
          }
        );
  }
};

export default Spotify;
