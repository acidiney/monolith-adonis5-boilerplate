import { StatusType } from 'app/modules/@shared/domain/types'

export interface FindUserUseCaseOutput {
  avatar: string | undefined
  fullName: string
  email: string
  lastLoginAt: string | undefined
  status: StatusType | undefined,
  lastLoginText: string | undefined
  updatedAt: string
  updatedAtText: string
  slug: string
  role: {
    isRoot: boolean,
    description: string,
    name: string
  }
}
