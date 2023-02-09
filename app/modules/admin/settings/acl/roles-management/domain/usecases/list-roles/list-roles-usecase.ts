/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {UseCase} from 'app/core/domain'
import {ListRolesUseCaseInput, ListRolesUseCaseOutput} from 'app/modules/admin/settings/acl/roles-management/domain'

export type ListRolesUseCase = UseCase<ListRolesUseCaseInput, ListRolesUseCaseOutput>
