import axios from "axios"
import { useRef } from "react"
import { GetUserPlaylistsResponse } from "./GetUserPlaylistsResponse"
import { GetPlaylistResponse } from "./GetPlaylistResponse"

export const createSpotifyClient = (accessToken: string) => {
  const api = useRef(
    axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      baseURL: "https://api.spotify.com/v1",
    })
  )

  const setToken = (accessToken: string) => {
    api.current = axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      baseURL: "https://api.spotify.com/v1",
    })
  }

  const getUserPlaylists = async (): Promise<GetUserPlaylistsResponse> => {
    const res = await api.current.get<GetUserPlaylistsResponse>("/me/playlists")
    return res.data
  }

  const getPlaylist = async (id: string): Promise<GetPlaylistResponse> => {
    const res = await api.current.get<GetPlaylistResponse>(`/playlists/${id}`)
    return res.data
  }

  return {
    setToken,
    getUserPlaylists,
    getPlaylist,
  }
}
