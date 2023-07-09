import axios from "axios"
import { PostAddItemsToPlaylist } from "./requests/PostAddItemsToPlaylist"
import { PostCreatePlaylistRequest } from "./requests/PostCreatePlaylistRequest"
import { GetPlaylistResponse, TrackItem } from "./response/GetPlaylistResponse"
import { GetUserPlaylistsResponse } from "./response/GetUserPlaylistsResponse"
import { SpotifyPlaylist } from "./SpotifyPlaylist"
import { SpotifyUserProfile } from "./SpotifyUserProfile"

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

  const getPlaylistItems = async (
    id: string,
    offset = 0,
    limit = 100
  ): Promise<{ total: number; items: TrackItem[] }> => {
    const res = await api.get(`/playlists/${id}/tracks?offset=${offset}&limit=${limit}`)
    return res.data
  }

  const getCurrentUserProfile = async (): Promise<SpotifyUserProfile> => {
    const res = await api.get<SpotifyUserProfile>(`/me`)
    return res.data
  }

  const createPlaylist = async (req: PostCreatePlaylistRequest): Promise<SpotifyPlaylist> => {
    const { userId, ...body } = req
    const res = await api.post<SpotifyPlaylist>(`/users/${userId}/playlists`, body)
    return res.data
  }

  const addItemsToPlaylist = async (req: PostAddItemsToPlaylist): Promise<string> => {
    const { playlist_id, ...body } = req
    const res = await api.post<string>(`/playlists/${playlist_id}/tracks`, body)
    return res.data
  }

  const unfollowPlaylist = async (playlistId: string): Promise<void> => {
    const res = await api.delete<void>(`/playlists/${playlistId}/followers`)
    return res.data
  }

  return {
    setToken,
    getUserPlaylists,
    getPlaylist,
    getPlaylistItems,
    getCurrentUserProfile,
    createPlaylist,
    addItemsToPlaylist,
    unfollowPlaylist,
  }
}
