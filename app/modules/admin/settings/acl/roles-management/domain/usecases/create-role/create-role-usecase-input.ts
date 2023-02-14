export interface CreateRoleUseCaseInput {
  name: string
  description: string
  permissions: string[]
  userId: string
}
