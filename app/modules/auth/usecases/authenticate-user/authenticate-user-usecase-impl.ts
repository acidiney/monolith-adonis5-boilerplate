import {AuthenticateUserInput, AuthenticateUserOutput, AuthenticateUserUseCase} from 'app/modules/auth/domain/usecases'
import {UserNameNotFoundError, UserPasswordMismatchError} from 'app/modules/auth/domain/errors'
import {Either, left, right} from 'app/core/domain'
import {FindUsernameRepository} from 'app/modules/auth/usecases'
import {VerifyPasswordMatchAdapter} from 'app/modules/auth/usecases/authenticate-user/ports'

export class AuthenticateUserUseCaseImpl implements AuthenticateUserUseCase {
  constructor (
    private readonly findUsernameRepository: FindUsernameRepository,
    private readonly verifyPasswordMatchAdapter: VerifyPasswordMatchAdapter
  ) {
  }

  public async perform (input: AuthenticateUserInput): Promise<
    Either<UserNameNotFoundError | UserPasswordMismatchError, AuthenticateUserOutput>
    > {
    const user = await this.findUsernameRepository.findUsername(input.username)

    if (!user) {
      return left(new UserNameNotFoundError())
    }

    const result = await this.verifyPasswordMatchAdapter.compare(user.password, input.password)

    if (!result) {
      return left(new UserPasswordMismatchError())
    }

    return right({
      userId: user.id.toString(),
    })
  }
}
