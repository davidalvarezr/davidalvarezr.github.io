export type PostCreatePlaylistRequest = {
  userId: string
  name: string
  description?: string
  public?: boolean // default: true
  collaborative?: boolean // default: false
}
