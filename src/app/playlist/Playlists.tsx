import React, { useCallback, useState } from "react"
import { useSpotifyAdapter } from "../SpotifyAdapterContext"
import { Track } from "../track/Track"
import { Playlist } from "./Playlist"
import { PlaylistComponent } from "./PlaylistComponent"

type PlaylistsProps = {
  playlists: Playlist[]
}
export const Playlists = (props: PlaylistsProps) => {
  const { playlists } = props

  const spotifyAdapter = useSpotifyAdapter()
  const [tracks, setTracks] = useState<Record<string, Track[] | undefined>>({})

  const getPlaylist = useCallback(
    (playlistId: string) => {
      spotifyAdapter.getPlaylist(playlistId).then((tracksLocal) => {
        setTracks({
          ...tracks,
          [playlistId]: tracksLocal,
        })
      })
    },
    [spotifyAdapter, tracks]
  )

  const reversePlaylist = async (playlistId: string): Promise<void> => {
    return await spotifyAdapter.createNewPlaylistAndSortByMostRecent(playlistId)
  }

  const deletePlaylist = async (playlistId: string): Promise<void> => {
    const playlist = playlists.find((p) => p.id === playlistId)

    if (confirm(`Are you sure you want to delete playlist "${playlist?.name}"`)) {
      return await spotifyAdapter.deletePlaylist(playlistId)
    }
  }

  return (
    <ul style={{ textAlign: "left", margin: "auto", width: "200px" }}>
      {playlists.map((playlist) => (
        <PlaylistComponent
          id={playlist.id}
          key={playlist.id}
          name={playlist.name}
          tracks={tracks[playlist.id] ?? []}
          onClickPlaylist={getPlaylist}
          onClickReverse={reversePlaylist}
          onClickDelete={deletePlaylist}
        />
      ))}
    </ul>
  )
}
