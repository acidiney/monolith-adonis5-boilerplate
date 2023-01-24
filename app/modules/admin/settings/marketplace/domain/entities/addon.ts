export interface Addon {
  name: string
  image?: string
  url: string
  version: string
  description: string
  requirements?: Addon[]
}
