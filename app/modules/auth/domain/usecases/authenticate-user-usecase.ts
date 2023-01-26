import { Either, UseCase } from 'app/core/domain'
import { UserNameNotFoundError, UserPasswordMisMatch } from '../errors'

export interface AuthenticateUserInput {
  username: string,
  password: string
}

export interface AuthenticateUserOutput {
  userId: string,
}

export type AuthenticateUserUseCase = UseCase<AuthenticateUserInput,
Either<UserNameNotFoundError | UserPasswordMisMatch, AuthenticateUserOutput>>
