import { Either, UseCase } from 'app/core/domain'
import { AppSettingInputErrors } from '../../errors/app-setting-input-errors'
import { PersistAppSettingUseCaseInput } from './persist-app-setting-usecase-input'

export type CreatedAppSettingResult = Either<
AppSettingInputErrors.AppNameRequiredError,
boolean
>

export type PersistAppSettingUseCase=UseCase<PersistAppSettingUseCaseInput, CreatedAppSettingResult>
