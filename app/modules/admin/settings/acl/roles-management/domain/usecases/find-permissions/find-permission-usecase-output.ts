export interface FindPermissionUseCaseOutput {
  id: string

  children: {
    id: string,
    display: string,
    description: string
  }[]
}

