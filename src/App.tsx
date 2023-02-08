import React, { MouseEvent, MutableRefObject, useEffect, useRef, useState } from "react"
import "./App.css"
import { ConnectToSpotifyLink } from "./spotify/auth/ConnectToSpotifyLink"
import { Playlist } from "./app/Playlist"
import { Playlists } from "./app/Playlists"
import { useSpotifyClient } from "./app/SpotifyClientContext"
import { useSpotifyAdapter } from "./app/SpotifyAdapterContext"
import { getTrackElement } from "./app/movement/getTrackElement"
import { highlightBorderAccordingToMousePosition } from "./app/movement/highlightBorderAccordingToMousePosition"
import { getTrackElementBelowTrack } from "./app/movement/getTrackElementBelowTrack"

function App() {
  const spotifyClient = useSpotifyClient()
  const spotifyAdapter = useSpotifyAdapter()
  const [playlists, setPlaylists] = useState<Playlist[]>([])

  const ref = useRef<HTMLDivElement>(null)
  const elementBeingMoved = useRef<HTMLDivElement>()
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const targetElement = useRef<HTMLDivElement>()

  const matches = window.location.hash.substring(1).match(/access_token=(.*)&token_type/)
  const token = matches && matches[1] ? matches[1] : ""
  useEffect(() => {
    if (token) {
      spotifyClient.setToken(token)
      spotifyAdapter.getUserPlaylists().then((playlists) => setPlaylists(playlists))
    }
  }, [token])

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    lastMousePosition.current = { x: e.clientX, y: e.clientY }
    elementBeingMoved.current = getTrackElement(e.target)
    if (elementBeingMoved.current) {
      elementBeingMoved.current.style.opacity = "0.5"
    }
  }

  let interval: NodeJS.Timer

  const moveElement = (
    e: MouseEvent<HTMLDivElement>,
    elementBeingMoved: MutableRefObject<HTMLDivElement>
  ) => {
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

    const elementsAtMousePosition = document.elementsFromPoint(e.clientX, e.clientY)
    const trackBehindHoldElement = getTrackElementBelowTrack(
      elementsAtMousePosition,
      elementBeingMoved.current
    )
    if (targetElement.current) {
      targetElement.current.style.borderTop = "none"
      targetElement.current.style.borderBottom = "none"
    }

    targetElement.current = trackBehindHoldElement
  }

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!elementBeingMoved.current) return

    const deltaMouseTop = e.clientY
    const deltaMouseBottom = window.innerHeight - e.clientY

    console.log("window.scrollY", window.scrollY)

    if (interval) {
      clearInterval(interval)
    }
    if (window.scrollY > 0 && deltaMouseTop < 30) {
      interval = setInterval(() => {
        window.scrollBy(0, -1)
        elementBeingMoved.current!.style.top = elementBeingMoved.current!.offsetTop - 1 + "px"
        if (!targetElement.current) {
          return
        }

        if (window.scrollY === 0) {
          console.log("CLLEEEEEEEAAAAAAAAAAAARRRR")
          clearInterval(interval)
        }
      }, 5)
    }

    // Move behaviour

    moveElement(e, elementBeingMoved as MutableRefObject<HTMLDivElement>)
    if (!targetElement.current) {
      return
    }
    highlightBorderAccordingToMousePosition(ref.current!, e.clientY, targetElement.current)
  }

  const onMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (!elementBeingMoved.current) return

    if (interval) {
      clearInterval(interval)
    }

    elementBeingMoved.current.style.opacity = "1"
    const elementsAtMousePosition = document.elementsFromPoint(e.clientX, e.clientY)
    const trackBehindHoldElement = getTrackElementBelowTrack(
      elementsAtMousePosition,
      elementBeingMoved.current
    )
    if (trackBehindHoldElement) {
      trackBehindHoldElement.style.borderTop = "none"
      trackBehindHoldElement.style.borderBottom = "none"
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
      <div style={{ marginBottom: "16px" }}>
        Welcome <ConnectToSpotifyLink />
      </div>
      {!!playlists.length && (
        <>
          <div style={{ marginBottom: "16px" }}>Your playlists:</div>
          <Playlists playlists={playlists} />
        </>
      )}
    </div>
  )
}

export default App
