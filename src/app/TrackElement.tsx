import React, { useRef, useState } from "react"

export type TrackProps = {
  index: number
  id: string
  name: string
}

export const TrackElement = (props: TrackProps) => {
  const { index, id, name } = props

  const ref = useRef<HTMLDivElement>(null)
  const [isHold, setIsHold] = useState(false)

  return (
    <div
      className="track-element"
      ref={ref}
      style={{
        cursor: "move",
        userSelect: "none",
        width: "200px",
        backgroundColor: "white",
        opacity: isHold ? 0.5 : 1,
      }}
      key={id}
      onMouseDown={() => setIsHold(true)}
      onMouseUp={() => setIsHold(false)}
    >
      {index + 1}. {name}
    </div>
  )
}
