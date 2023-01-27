import React, { useEffect, useState } from "react"
import "./App.css"
import { ConnectToSpotifyLink } from "./spotify/auth/ConnectToSpotifyLink"
import { createSpotifyClient } from "./api/createSpotifyClient"
import { createSpotifyAdapter } from "./spotify/createSpotifyAdapter"
import { Playlist } from "./spotify/Playlist"

function App() {
  const matches = window.location.hash.substring(1).match(/access_token=(.*)&token_type/)
  const token = (matches?.length ?? 0) > 1 ? matches![1] : ""
  const spotifyClient = createSpotifyClient(token)
  const spotifyAdapter = createSpotifyAdapter(spotifyClient)
  const [playlists, setPlaylists] = useState<Playlist[]>([])

  useEffect(() => {
    if (!!token) {
      spotifyAdapter.getUserPlaylists().then((playlists) => setPlaylists(playlists))
    }
  }, [token])

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
              <li>{playlist.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default App
