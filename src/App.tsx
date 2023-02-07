import React, { MouseEvent, useEffect, useRef, useState } from "react"
import "./App.css"
import { ConnectToSpotifyLink } from "./spotify/auth/ConnectToSpotifyLink"
import { createSpotifyClient } from "./api/createSpotifyClient"
import { createSpotifyAdapter } from "./app/createSpotifyAdapter"
import { Playlist } from "./app/Playlist"
import { Track } from "./app/Track"
import { TrackElement } from "./app/TrackElement"

function App() {
  const matches = window.location.hash.substring(1).match(/access_token=(.*)&token_type/)
  const token = matches && matches[1] ? matches[1] : ""
  const spotifyClient = createSpotifyClient(token)
  const spotifyAdapter = createSpotifyAdapter(spotifyClient)
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [tracks, setTracks] = useState<Record<string, Track[]>>({})

  const ref = useRef<HTMLDivElement>(null)
  const elementBeingMoved = useRef<HTMLDivElement>()
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const targetElement = useRef<HTMLDivElement>()

  useEffect(() => {
    if (token) {
      spotifyClient.setToken(token)
      spotifyAdapter.getUserPlaylists().then((playlists) => setPlaylists(playlists))
    }
  }, [token])

  const getPlaylist = (playlistId: string) => {
    spotifyAdapter.getPlaylist(playlistId).then((tracksLocal) => {
      setTracks({
        ...tracks,
        [playlistId]: tracksLocal,
      })
    })
  }

  const totalOffset = (
    offsets: { offsetX: number; offsetY: number },
    element: HTMLElement
  ): { offsetX: number; offsetY: number } => {
    if (element === ref.current) return offsets

    return totalOffset(
      {
        offsetX: offsets.offsetX + element.offsetLeft,
        offsetY: offsets.offsetY + element.offsetTop,
      },
      element.parentElement!
    )
  }

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    lastMousePosition.current = { x: e.clientX, y: e.clientY }
    elementBeingMoved.current =
      (e.target as Element).className === "track-element" ? (e.target as HTMLDivElement) : undefined
  }

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rects = ref.current!.getBoundingClientRect()
    if (!elementBeingMoved.current) return

    // Move behaviour

    const offsets = {
      offsetLeft: elementBeingMoved.current!.offsetLeft,
      offsetTop: elementBeingMoved.current!.offsetTop,
    }

    const deltaX = lastMousePosition.current.x - e.clientX
    const deltaY = lastMousePosition.current.y - e.clientY

    lastMousePosition.current = { x: e.clientX, y: e.clientY }

    elementBeingMoved.current!.style.top = offsets.offsetTop - deltaY + "px"
    elementBeingMoved.current!.style.left = offsets.offsetLeft - deltaX + "px"
    elementBeingMoved.current!.style.position = "absolute"

    // Border highlight behavior

    const elementBehindHoldElement = document.elementsFromPoint(e.clientX, e.clientY)[1]
    const trackBehindHoldElement =
      elementBehindHoldElement.className === "track-element"
        ? (elementBehindHoldElement as HTMLDivElement)
        : undefined
    if (targetElement.current) {
      targetElement.current.style.borderTop = "none"
      targetElement.current.style.borderBottom = "none"
    }
    targetElement.current = trackBehindHoldElement

    if (!targetElement.current) {
      return
    }

    const deltaTop = e.clientY - (targetElement.current?.offsetTop + rects.top)
    const deltaBottom =
      targetElement.current?.offsetTop + targetElement.current?.offsetHeight + rects.top - e.clientY

    console.log(deltaTop, deltaBottom)

    if (deltaTop < deltaBottom) {
      targetElement.current.style.borderTop = "solid 2px orange"
    } else {
      targetElement.current.style.borderBottom = "solid 2px orange"
    }
  }

  const onMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    const elementBehindHoldElement = document.elementsFromPoint(e.clientX, e.clientY)[1]
    if (elementBehindHoldElement.className === "track-element") {
      const elt = elementBehindHoldElement as HTMLDivElement
      elt.style.borderBottom = "none"
    }
    elementBeingMoved.current!.style.position = "inherit"
    elementBeingMoved.current = undefined
  }

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      ref={ref}
      className="App"
    >
      Welcome <ConnectToSpotifyLink />
      <br />
      <br />
      {!!playlists.length && (
        <>
          Your playlists:
          <br />
          <br />
          <ul style={{ textAlign: "left", margin: "auto", width: "200px" }}>
            {playlists.map((playlist) => (
              <li key={playlist.name}>
                <button onClick={() => getPlaylist(playlist.id)}>{playlist.name}</button>
                {tracks[playlist.id]?.length && (
                  <div>
                    {tracks[playlist.id].map((track, index) => (
                      <TrackElement index={index} key={track.id} id={track.id} name={track.name} />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default App
