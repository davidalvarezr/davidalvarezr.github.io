import React from "react"

export const ConnectToSpotifyLink = () => {
  const clientId = "8d7301f2986c40cd917eda9af9135fcf" // Your client id
  const redirectUri = `${window.location.protocol}//${window.location.host}` // Your redirect uri;
  console.log(redirectUri)
  const scope = "user-read-private user-read-email playlist-modify-public"
  const url = "https://accounts.spotify.com/authorize"
  const fullUrl = `${url}?response_type=token&client_id=${encodeURIComponent(
    clientId
  )}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}`

  return <a href={fullUrl}>Connect to Spotify</a>
}
