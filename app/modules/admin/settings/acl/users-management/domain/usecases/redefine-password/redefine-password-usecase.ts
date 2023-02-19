import { UseCase } from 'app/core/domain'
import { RedefinePasswordUseCaseInput } from './redefine-password-usecase-input'

export type RedefinePasswordUseCase = UseCase<RedefinePasswordUseCaseInput, boolean>
