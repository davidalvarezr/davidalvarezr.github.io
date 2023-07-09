import { createContext, useContext } from "react"
import { createSpotifyClient } from "../api/createSpotifyClient"

const spotifyClient = createSpotifyClient()

const SpotifyClientContext = createContext(spotifyClient)

export const SpotifyClientProvider = SpotifyClientContext.Provider
export const useSpotifyClient = () => useContext(SpotifyClientContext)
