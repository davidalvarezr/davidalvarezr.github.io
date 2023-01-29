import { createSpotifyClient } from "../api/createSpotifyClient"
import { Playlist } from "./Playlist"

export const createSpotifyAdapter = (spotifyClient: ReturnType<typeof createSpotifyClient>) => {
  const getUserPlaylists = async (): Promise<Playlist[]> => {
    const data = await spotifyClient.getUserPlaylists()
    return data.items.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      nbOfTracks: playlist.tracks.total,
      owner: playlist.owner.display_name,
    }))
  }

  return {
    getUserPlaylists,
  }
}
