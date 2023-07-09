import { PropsWithChildren } from "react"
import { createSpotifyClient } from "../api/createSpotifyClient"
import { createSpotifyAdapter } from "./createSpotifyAdapter"
import { SpotifyAdapterProvider } from "./SpotifyAdapterContext"
import { SpotifyClientProvider } from "./SpotifyClientContext"

type ContainerProps = PropsWithChildren

export const Container = (props: ContainerProps) => {
  const { children } = props

  const spotifyClient = createSpotifyClient()
  const spotifyAdapter = createSpotifyAdapter(spotifyClient)

  return (
    <SpotifyClientProvider value={spotifyClient}>
      <SpotifyAdapterProvider value={spotifyAdapter}>{children}</SpotifyAdapterProvider>
    </SpotifyClientProvider>
  )
}
