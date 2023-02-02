import { Either, UseCase } from 'app/core/domain'
import { UserNotFoundError } from '../errors'

export interface SendResetPasswordInput {
  username: string
}

export type SendResetPasswordUseCase = UseCase<SendResetPasswordInput, Either<
  UserNotFoundError,
  boolean
>>
