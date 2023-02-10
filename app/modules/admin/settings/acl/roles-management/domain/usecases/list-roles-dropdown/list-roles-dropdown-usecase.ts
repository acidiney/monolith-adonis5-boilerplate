/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {UseCase} from 'app/core/domain'
import {
  ListRolesDropdownUseCaseOutput,
} from './list-roles-dropdown-usecase-output'

export type ListRolesDropdownUseCaseInput = {
  isRoot: boolean
}

export type ListRolesDropdownUseCase = UseCase<ListRolesDropdownUseCaseInput, ListRolesDropdownUseCaseOutput>
