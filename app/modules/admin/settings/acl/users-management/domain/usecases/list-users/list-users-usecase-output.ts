/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {Pagination} from 'app/core/ports'

export interface User {
  slug: string,
  fullName: string,
  updatedAt: string,
  firstName: string,
  lastName: string,
  email: string,
  updatedAtText: string
  lastLoginAt: string
  lastLoginAtText: string
  status: string
  roleId: string
  roleText: string
}

export type ListUsersUseCaseOutput = Pagination<User>
