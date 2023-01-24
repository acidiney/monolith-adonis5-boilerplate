export interface Addon {
  name: string
  image?: string
  version: Number,
  url: string
  description: string
  requirements?: Addon[]
}
