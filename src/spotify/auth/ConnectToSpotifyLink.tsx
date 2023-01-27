import React from "react"

export const ConnectToSpotifyLink = () => {
  const clientId = "8d7301f2986c40cd917eda9af9135fcf" // Your client id
  const redirectUri = window.location.href // Your redirect uri;
  const scope = "user-read-private user-read-email"
  const url = "https://accounts.spotify.com/authorize"
  const fullUrl = `${url}?response_type=token&client_id=${encodeURIComponent(
    clientId
  )}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`

  return <a href={fullUrl}>Connect to Spotify</a>
}
