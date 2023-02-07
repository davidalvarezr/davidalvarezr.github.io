import { createSpotifyAdapter } from "./createSpotifyAdapter"
import { createSpotifyClient } from "../api/createSpotifyClient"
import { createContext, useContext } from "react"

const spotifyAdapter = createSpotifyAdapter(createSpotifyClient())

const SpotifyAdapterContext = createContext(spotifyAdapter)

export const SpotifyAdapterProvider = SpotifyAdapterContext.Provider
export const useSpotifyAdapter = () => useContext(SpotifyAdapterContext)
