import axios from "axios"
import { GetUserPlaylistsResponse } from "./GetUserPlaylistsResponse"
import { GetPlaylistResponse } from "./GetPlaylistResponse"

export const createSpotifyClient = () => {
  let api = axios.create({
    baseURL: "https://api.spotify.com/v1",
  })

  const setToken = (accessToken: string) => {
    api = axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      baseURL: "https://api.spotify.com/v1",
    })
  }

  const getUserPlaylists = async (): Promise<GetUserPlaylistsResponse> => {
    const res = await api.get<GetUserPlaylistsResponse>("/me/playlists")
    return res.data
  }

  const getPlaylist = async (id: string): Promise<GetPlaylistResponse> => {
    const res = await api.get<GetPlaylistResponse>(`/playlists/${id}`)
    return res.data
  }

  return {
    setToken,
    getUserPlaylists,
    getPlaylist,
  }
}
