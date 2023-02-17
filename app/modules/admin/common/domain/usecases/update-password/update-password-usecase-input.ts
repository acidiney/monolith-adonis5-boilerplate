
interface UpdatePasswordOptions {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UpdatePasswordUseCaseInput {
  userId: string
  passwordOptions: UpdatePasswordOptions
}
