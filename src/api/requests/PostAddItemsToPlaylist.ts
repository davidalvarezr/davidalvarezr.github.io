export type PostAddItemsToPlaylist = {
  playlist_id: string
  uris: string[] // max 100
  position?: number
}
