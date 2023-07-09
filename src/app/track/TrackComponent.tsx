import React, { useRef } from "react"

export type TrackComponentProps = {
  index: number
  id: string
  name: string
}

export const TrackComponent = (props: TrackComponentProps) => {
  const { index, id, name } = props

  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className="track-element"
      ref={ref}
      style={{
        cursor: "move",
        userSelect: "none",
        width: "200px",
        backgroundColor: "white",
        opacity: 1,
      }}
      key={id}
    >
      {index + 1}. {name}
    </div>
  )
}
