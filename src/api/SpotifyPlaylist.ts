type Owner = {
  display_name: string
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  type: string
  uri: string
}

export type SpotifyPlaylist = {
  collaborative: boolean
  description: string
  external_urls: {
    spotify: string
  }
  href: string
  id: string
  images: {
    height: number
    url: string
    width: number
  }[]
  name: string
  owner: Owner
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
