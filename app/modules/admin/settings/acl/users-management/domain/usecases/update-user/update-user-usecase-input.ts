import { CreateUserUseCaseInput } from '../create-user'

export interface UpdateUserUseCaseInput extends CreateUserUseCaseInput {
  username: string
}
