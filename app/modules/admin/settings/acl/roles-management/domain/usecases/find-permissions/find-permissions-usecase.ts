import {UseCase} from 'app/core/domain'
import {
  FindPermissionUseCaseOutput,
} from './find-permission-usecase-output'

export type FindPermissionsUseCase = UseCase<{ isRoot: boolean }, FindPermissionUseCaseOutput[]>
