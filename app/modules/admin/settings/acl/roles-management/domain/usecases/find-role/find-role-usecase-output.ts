export interface FindRoleUseCaseOutput {
  name: string
  description: string
  slug: string
  internal: boolean
  permissions: string[]
  updatedAtText: string
  updatedAt: string
  user?: {
    fullName: string,
    slug: string
  }
}
