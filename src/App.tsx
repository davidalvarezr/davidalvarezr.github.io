import React, { useEffect, useState } from "react"
import "./App.css"
import { ConnectToSpotifyLink } from "./spotify/auth/ConnectToSpotifyLink"
import { createSpotifyClient } from "./api/createSpotifyClient"
import { createSpotifyAdapter } from "./spotify/createSpotifyAdapter"
import { Playlist } from "./spotify/Playlist"

function App() {
  const matches = window.location.hash.substring(1).match(/access_token=(.*)&token_type/)
  const token = matches && matches[1] ? matches[1] : ""
  const spotifyClient = createSpotifyClient(token)
  const spotifyAdapter = createSpotifyAdapter(spotifyClient)
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [tracks, setTracks] = useState<Record<string, string[]>>({})

  useEffect(() => {
    if (token) {
      spotifyClient.setToken(token)
      spotifyAdapter.getUserPlaylists().then((playlists) => setPlaylists(playlists))
    }
  }, [token])

  const getPlaylist = (playlistId: string) => {
    spotifyClient.getPlaylist(playlistId).then((res) => {
      setTracks({
        ...tracks,
        [playlistId]: (res.tracks.items as { track: { name: string } }[]).map(
          (item) => item.track.name
        ),
      })
    })
  }

  return (
    <div className="App">
      Welcome <ConnectToSpotifyLink />
      <br />
      <br />
      {!!playlists.length && (
        <>
          Your playlists:
          <br />
          <br />
          <ul style={{ textAlign: "left", margin: "auto", width: "200px" }}>
            {playlists.map((playlist) => (
              <li key={playlist.name}>
                <button onClick={() => getPlaylist(playlist.id)}>{playlist.name}</button>
                {tracks[playlist.id]?.length && (
                  <ul>
                    {tracks[playlist.id].map((track) => (
                      <li key={track}>{track}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default App
