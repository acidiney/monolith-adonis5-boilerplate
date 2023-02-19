export interface DeleteUserUseCaseImpl {
  adminId: string
  deletePayload: {
    userId: string,
    motivation: string
  }
}
