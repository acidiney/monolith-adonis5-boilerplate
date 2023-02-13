export interface FindPermissionUseCaseOutput {
  id: string
  title: string

  children: {
    id: string,
    display: string,
    description: string
  }[]
}

