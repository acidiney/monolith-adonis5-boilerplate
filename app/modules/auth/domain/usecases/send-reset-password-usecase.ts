import { Either, UseCase } from 'app/core/domain'
import { UserNameNotFoundError } from '../errors'

export interface SendResetPasswordInput {
  username: string
}

export type SendResetPasswordUseCase = UseCase<SendResetPasswordInput, Either<
  UserNameNotFoundError,
  boolean
>>
