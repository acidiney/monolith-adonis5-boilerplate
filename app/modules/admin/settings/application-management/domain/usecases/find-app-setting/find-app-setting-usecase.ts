import { UseCaseWithoutInput } from 'app/core/domain'
import { AppSettingUseCaseOutput } from './find-app-setting-usecase-output'

export type FindAppSettingUseCase = UseCaseWithoutInput< AppSettingUseCaseOutput>
