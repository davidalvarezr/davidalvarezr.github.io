import { createSpotifyClient } from "../api/createSpotifyClient"
import { Playlist } from "./Playlist"

export const createSpotifyAdapter = (spotifyClient: ReturnType<typeof createSpotifyClient>) => {
  const getUserPlaylists = async (): Promise<Playlist[]> => {
    const data = await spotifyClient.getUserPlaylists()
    return data.items
  }

  return {
    getUserPlaylists,
  }
}
