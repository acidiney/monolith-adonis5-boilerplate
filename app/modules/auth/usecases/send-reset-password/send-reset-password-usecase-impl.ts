import { Either, left, right } from 'app/core/domain'
import { UserNameNotFoundError } from '../../domain/errors'
import { SendResetPasswordInput, SendResetPasswordUseCase } from '../../domain/usecases'
import { FindUsernameRepository, GenerateResetPasswordTokenRepository, SendResetPasswordLinkService } from './ports'

export class SendResetPasswordUseCaseImpl implements SendResetPasswordUseCase {
  constructor (
    private readonly findUsernameRepository: FindUsernameRepository,
    private readonly generateResetPasswordTokenRepository: GenerateResetPasswordTokenRepository,
    private readonly sendResetPasswordLinkService: SendResetPasswordLinkService
  ) {}

  public async perform (input: SendResetPasswordInput): Promise<Either<UserNameNotFoundError, boolean>> {
    const user = await this.findUsernameRepository.findUsername(input.username)

    if (!user) {
      return left(new UserNameNotFoundError())
    }

    const token = await this.generateResetPasswordTokenRepository.generate(user.id)

    await this.sendResetPasswordLinkService.send({
      username: user.email,
      fullName: user.fullName,
      token,
    })

    return right(true)
  }
}
