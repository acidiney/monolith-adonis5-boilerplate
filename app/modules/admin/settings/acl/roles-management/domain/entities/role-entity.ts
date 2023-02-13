import {Either, Entity, left, Options, right, UniqueEntityID} from 'app/core/domain'
import {
  PermissionAreMissingError,
  RoleDescriptionRequiredError,
  RoleNameRequiredError,
} from 'app/modules/admin/settings/acl/roles-management/domain/errors'

type Errors = RoleNameRequiredError | RoleDescriptionRequiredError | PermissionAreMissingError

export interface RoleProps {
  name: string
  slug?: string
  description: string
  internal: boolean
  permissions: UniqueEntityID[]
}

export class RoleEntity extends Entity<RoleProps> {
  public get name () : string {
    return this.props.name
  }

  public get isInternal (): boolean {
    return this.props.internal
  }

  public get description (): string {
    return this.props.description
  }

  public get slug (): string {
    return this.props.slug as string
  }

  public get permissions (): UniqueEntityID[] {
    return this.props.permissions
  }

  public validate (): Either<Errors, boolean> {
    if (!this.props.name || !this.props.name.length) {
      return left(new RoleNameRequiredError())
    }

    if (!this.props.description || !this.props.description.length) {
      return left(new RoleDescriptionRequiredError())
    }

    if (!this.props.permissions || this.props.permissions.length <= 0) {
      return left(new PermissionAreMissingError())
    }

    return right(true)
  }

  public static create (name: string, description: string, permissions: UniqueEntityID[]): Either<Errors, RoleEntity> {
    const roleEntity = new RoleEntity({
      name,
      description,
      permissions,
      internal: false,
    })

    const validation = roleEntity.validate()
    if (validation.isLeft()) {
      return left(validation.value)
    }

    return right(roleEntity)
  }

  public static hydrate (id: UniqueEntityID, props: RoleProps, options?: Options): RoleEntity {
    return new RoleEntity(props, id, options)
  }
}
