import { Either, right } from 'app/core/domain'
import { UserNotFoundError } from 'app/modules/auth/domain'
import { UpdateUserInfoUseCase, UpdateUserInfoUseCaseInput } from '../../domain'

export class UpdateUserInfoUseCaseImpl implements UpdateUserInfoUseCase {
  public async perform (input: UpdateUserInfoUseCaseInput): Promise<Either<UserNotFoundError, boolean >> {
    return right(true)
  }
}
