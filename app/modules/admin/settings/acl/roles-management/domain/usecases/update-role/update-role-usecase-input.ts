export interface UpdateRoleUseCaseInput {
  roleSlug: string
  isRoot: boolean
  name: string
  description: string
  permissions: string[]
}
