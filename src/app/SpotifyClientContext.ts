import { createSpotifyClient } from "../api/createSpotifyClient"
import { createContext, useContext } from "react"

const spotifyClient = createSpotifyClient()

const SpotifyClientContext = createContext(spotifyClient)

export const SpotifyClientProvider = SpotifyClientContext.Provider
export const useSpotifyClient = () => useContext(SpotifyClientContext)
