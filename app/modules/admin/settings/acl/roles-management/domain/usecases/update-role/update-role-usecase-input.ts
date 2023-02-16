export interface UpdateRoleUseCaseInput {
  roleSlug: string
  userId: string
  isRoot: boolean
  name: string
  description: string
  permissions: string[]
}
