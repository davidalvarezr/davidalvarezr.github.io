import axios from "axios"
import { useRef } from "react"
import { GetUserPlaylistsResponse } from "./GetUserPlaylistsResponse"

export const createSpotifyClient = (accessToken: string) => {
  const token = useRef(accessToken)

  const api = axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const setToken = (accessToken: string) => {
    token.current = accessToken
  }

  const getUserPlaylists = async (): Promise<GetUserPlaylistsResponse> => {
    const res = await api.get<GetUserPlaylistsResponse>("https://api.spotify.com/v1/me/playlists")
    return res.data
  }

  return {
    setToken,
    getUserPlaylists,
  }
}
