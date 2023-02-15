export interface UpdateRoleUseCaseInput {
  roleSlug: string
  userId: string
  name: string
  description: string
  permissions: string[]
}
