/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {Pagination} from 'app/core/ports'

export interface User {
  slug: string,
  fullName: string,
  updatedAt: string,

  email: string,
  updatedAtText: string
  lastLoginAt: string
  lastLoginAtText: string
  status: string
  roleText: string
}

export type ListUsersUseCaseOutput = Pagination<User>
