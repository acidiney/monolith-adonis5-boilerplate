/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {Pagination} from 'app/core/ports'

export interface User {
  slug: string,
  fullName: string,
  updatedAt: Date,

  email: string,
  updatedAtText: string
  lastLoginAt: Date
  lastLoginAtText: string
  status: string
  roleText: string
}

export type ListUsersUseCaseOutput = Pagination<User>
