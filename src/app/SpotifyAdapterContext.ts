import { createContext, useContext } from "react"
import { createSpotifyClient } from "../api/createSpotifyClient"
import { createSpotifyAdapter } from "./createSpotifyAdapter"

const spotifyAdapter = createSpotifyAdapter(createSpotifyClient())

const SpotifyAdapterContext = createContext(spotifyAdapter)

export const SpotifyAdapterProvider = SpotifyAdapterContext.Provider
export const useSpotifyAdapter = () => useContext(SpotifyAdapterContext)
