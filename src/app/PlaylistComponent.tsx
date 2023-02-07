import { TrackComponent } from "./TrackComponent"
import React, { memo } from "react"
import { Track } from "./Track"

type PlaylistComponentProps = {
  id: string
  name: string
  tracks: Track[]
  onClickPlaylist: (playlistId: string) => void
}
export const PlaylistComponent = memo((props: PlaylistComponentProps) => {
  const { id, name, tracks, onClickPlaylist } = props

  return (
    <li>
      <button onClick={() => onClickPlaylist(id)}>{name}</button>
      {
        <div>
          {tracks.map((track, index) => (
            <TrackComponent index={index} key={track.id} id={track.id} name={track.name} />
          ))}
        </div>
      }
    </li>
  )
})

PlaylistComponent.displayName = "PlaylistComponent"
