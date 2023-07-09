import { Playlist } from "./playlist/Playlist"
import { Track } from "./track/Track"

export interface IMusicServiceAdapter {
  getUserPlaylists(): Promise<Playlist[]>
  getPlaylist(playlistId: string): Promise<Track[]>
  createNewPlaylistAndSortByMostRecent(playlistSourceId: string): Promise<void>
  deletePlaylist(playlistId: string): Promise<void>
}
