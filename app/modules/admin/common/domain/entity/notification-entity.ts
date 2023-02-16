import { Entity, UniqueEntityID } from 'app/core/domain'

interface NotificationProps {
  name: string
  type?: string
}

export class NotificationEntity extends Entity<NotificationProps> {
  public get name () {
    return this.props.name
  }

  public get type (): string | undefined {
    return this.props.type
  }

  public static hydrate (id: UniqueEntityID, props: NotificationProps) {
    return new NotificationEntity(props, id)
  }
}
