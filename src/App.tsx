import axios from "axios"
import React, { useEffect, useState } from "react"
import "./App.css"

function App() {
  const clientId = "8d7301f2986c40cd917eda9af9135fcf" // Your client id
  const redirectUri = window.location.href // Your redirect uri;
  const scope = "user-read-private user-read-email"
  const url = "https://accounts.spotify.com/authorize"
  const fullUrl = `${url}?response_type=token&client_id=${encodeURIComponent(
    clientId
  )}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`

  const matches = window.location.hash.substring(1).match(/access_token=(.*)&token_type/)
  const token = (matches?.length ?? 0) > 1 ? matches![1] : undefined

  const [playlists, setPlaylists] = useState<{ name: string }[]>([])

  useEffect(() => {
    if (!!token) {
      axios
        .get("https://api.spotify.com/v1/me/playlists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setPlaylists(res.data.items))
    }
  }, [token])

  return (
    <div className="App">
      Welcome <a href={fullUrl}>Connect to Spotify</a>
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
