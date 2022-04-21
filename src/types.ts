export interface ISong {
  artist: string
  duration: number
  id: string
  thumbnail: string
  title: string
  url: string
  created_at?: Date
}

export interface ISongData {
  songs: ISong[]
}
