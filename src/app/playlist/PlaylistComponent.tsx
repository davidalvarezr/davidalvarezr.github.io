import React, { memo } from "react"
import { Track } from "../track/Track"
import { TrackComponent } from "../track/TrackComponent"

type PlaylistComponentProps = {
  id: string
  name: string
  tracks: Track[]
  onClickPlaylist: (playlistId: string) => void
  onClickReverse: (playlistId: string) => void
  onClickDelete: (playlistId: string) => void
}
export const PlaylistComponent = memo((props: PlaylistComponentProps) => {
  const { id, name, tracks, onClickPlaylist, onClickReverse, onClickDelete } = props

  return (
    <li>
      <div style={{ display: "flex" }}>
        <button onClick={() => onClickPlaylist(id)}>{name}</button>
        <button onClick={() => onClickReverse(id)}>reverse</button>
        <button onClick={() => onClickDelete(id)}>delete</button>
      </div>
      <div>
        {tracks.map((track, index) => (
          <TrackComponent index={index} key={track.id} id={track.id} name={track.name} />
        ))}
      </div>
    </li>
  )
})

PlaylistComponent.displayName = "PlaylistComponent"
