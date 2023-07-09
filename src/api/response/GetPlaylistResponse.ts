import { PagingObject } from "../PagingObject"
import { SpotifyImage } from "../SpotifyImage"
import { SpotifyOwner } from "../SpotifyOwner"

export type AddedBy = {
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  type: string
  uri: string
}

export type Artist = {
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  name: string
  type: string
  uri: string
}

export type Album = {
  album_type: string
  artists: Artist[]
  available_markets: string[]
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: SpotifyImage[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}

type Track = {
  album: Album
  artists: Artist[]
  available_markets: string[]
  disc_number: number
  duration_ms: number
  episode: boolean
  explicit: boolean
  external_ids: {
    isrc: string
  }
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  is_local: boolean
  name: string
  popularity: number
  preview_url: string
  track: boolean
  track_number: number
  type: string
  uri: string
}

export type TrackItem = {
  added_at: Date
  added_by: AddedBy
  is_local: boolean
  primary_color?: any
  track: Track
  video_thumbnail: {
    url?: any
  }
}

export type GetPlaylistResponse = {
  collaborative: boolean
  description: string
  external_urls: {
    spotify: string
  }
  followers: {
    href?: any
    total: number
  }
  href: string
  id: string
  images: SpotifyImage[]
  name: string
  owner: SpotifyOwner
  primary_color?: any
  public: boolean
  snapshot_id: string
  tracks: PagingObject<TrackItem>
  type: string
  uri: string
}
