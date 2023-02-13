import { Entity, UniqueEntityID} from 'app/core/domain'

export interface PermissionProps {
  name: string
  description: string

  group: string
}

export class PermissionEntity extends Entity<PermissionProps> {
  public get name () : string {
    return this.props.name
  }

  public get description (): string {
    return this.props.description
  }

  public get group (): string {
    return this.props.group
  }

  public static hydrate (id: UniqueEntityID, props: PermissionProps): PermissionEntity {
    return new PermissionEntity(props, id)
  }
}
