/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {Pagination} from 'app/core/ports'

export interface Role {
  slug: string,
  name: string,
  isInternal: boolean
  updatedAt: string,
  updatedAtText: string
}

export type ListRolesUseCaseOutput = Pagination<Role>
