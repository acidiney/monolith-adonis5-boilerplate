/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

export interface RoleOptions {
  id: string,
  name: string,

  slug: string,
}

export type ListRolesDropdownUseCaseOutput = RoleOptions[]
