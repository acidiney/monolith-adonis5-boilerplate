/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {Entity, Options, UniqueEntityID} from 'app/core/domain'

export interface RoleProps {
  name: string
  slug?: string
  internal: boolean
}

export class RoleEntity extends Entity<RoleProps> {
  public get name () : string {
    return this.props.name
  }

  public get isInternal (): boolean {
    return this.props.internal
  }

  public get slug (): string {
    return this.props.slug as string
  }

  public static hydrate (id: UniqueEntityID, props: RoleProps, options?: Options): RoleEntity {
    return new RoleEntity(props, id, options)
  }
}
