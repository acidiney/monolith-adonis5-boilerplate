export interface Addon {
  name: string
  image?: string
  version: Number,
  url: string
  description: string
  canInstall?: boolean
  update?: boolean
  requirements?: Addon[]
}
