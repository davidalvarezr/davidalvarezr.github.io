import { SpotifyImage } from "./SpotifyImage"
import { SpotifyOwner } from "./SpotifyOwner"

export type SpotifyPlaylist = {
  collaborative: boolean
  description: string
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: SpotifyImage[]
  name: string
  owner: SpotifyOwner
  primary_color: unknown
  public: boolean
  snapshot_id: string
  tracks: {
    href: string
    total: number
  }
  type: string
  uri: string
}
