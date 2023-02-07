import { createSpotifyClient } from "../api/createSpotifyClient"
import { Playlist } from "./Playlist"
import { Track } from "./Track"

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

  const getPlaylist = async (id: string): Promise<Track[]> => {
    const data = await spotifyClient.getPlaylist(id)
    return data.tracks.items.map((track) => ({
      id: track.track.id,
      name: track.track.name,
    }))
  }

  return {
    getUserPlaylists,
    getPlaylist,
  }
}
