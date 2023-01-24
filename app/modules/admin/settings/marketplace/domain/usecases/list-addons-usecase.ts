import { UseCaseWithoutInput } from 'app/core/domain'
import { Addon } from '../entities/addon'

export type ListAddonsUseCase = UseCaseWithoutInput<
  Addon[]
>
