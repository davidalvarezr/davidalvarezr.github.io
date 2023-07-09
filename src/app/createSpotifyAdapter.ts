import { createSpotifyClient } from "../api/createSpotifyClient"
import { TrackItem } from "../api/response/GetPlaylistResponse"
import { IMusicServiceAdapter } from "./IMusicServiceAdapter"
import { Playlist } from "./playlist/Playlist"
import { Track } from "./track/Track"

export const createSpotifyAdapter = (
  spotifyClient: ReturnType<typeof createSpotifyClient>
): IMusicServiceAdapter => ({
  getUserPlaylists: async (): Promise<Playlist[]> => {
    const data = await spotifyClient.getUserPlaylists()
    return data.items.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      nbOfTracks: playlist.tracks.total,
      owner: playlist.owner.display_name,
    }))
  },

  getPlaylist: async (playlistId: string): Promise<Track[]> => {
    const data = await spotifyClient.getPlaylist(playlistId)
    return data.tracks.items.map((track) => ({
      id: track.track.id,
      name: track.track.name,
    }))
  },

  createNewPlaylistAndSortByMostRecent: async (playlistSourceId: string): Promise<void> => {
    const limit = 100
    let offset = 0
    let total = 0
    let tracks: TrackItem[] = []
    let playlistItemsResponse: { total: number; items: TrackItem[] }

    const me = await spotifyClient.getCurrentUserProfile()

    const playlist = await spotifyClient.getPlaylist(playlistSourceId)

    do {
      playlistItemsResponse = await spotifyClient.getPlaylistItems(playlistSourceId, offset, limit)
      offset += playlistItemsResponse.items.length
      total = playlistItemsResponse.total
      tracks = [...tracks, ...playlistItemsResponse.items]
    } while (offset < total)

    const reversedTracks = [...tracks].sort((a, b) => {
      if (a.added_at < b.added_at) {
        return 1
      }
      return -1
    })

    const newPlaylistResponse = await spotifyClient.createPlaylist({
      userId: me.id,
      name: `${playlist.name} (reversed)`,
    })

    for (let i = 0; i < reversedTracks.length; i += 100) {
      const chunk = reversedTracks.slice(i, i + 100)

      await spotifyClient.addItemsToPlaylist({
        playlist_id: newPlaylistResponse.id,
        uris: chunk.map((track) => track.track.uri),
      })
    }
  },

  deletePlaylist(playlistId: string): Promise<void> {
    return spotifyClient.unfollowPlaylist(playlistId)
  },
})
