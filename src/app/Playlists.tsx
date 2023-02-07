import React, { useCallback, useState } from "react"
import { Playlist } from "./Playlist"
import { Track } from "./Track"
import { useSpotifyAdapter } from "./SpotifyAdapterContext"
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

  return (
    <ul style={{ textAlign: "left", margin: "auto", width: "200px" }}>
      {playlists.map((playlist) => (
        <PlaylistComponent
          id={playlist.id}
          key={playlist.id}
          name={playlist.name}
          tracks={tracks[playlist.id] ?? []}
          onClickPlaylist={getPlaylist}
        />
      ))}
    </ul>
  )
}
