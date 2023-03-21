import {Entity, UniqueEntityID} from 'app/core/domain'

export type EventType = 'success' | 'error' | 'warning' | 'info'

interface NotificationProps {
  readAt: Date | null
  userId: UniqueEntityID
  subject: string
  message: string | null

  routePath?: string
  eventType: EventType
  icon?: string
}

export class NotificationEntity extends Entity<NotificationProps> {
  public get readAt (): Date | null {
    return this.props.readAt
  }
  public get icon (): string | undefined {
    return this.props.icon
  }
  public get userId (): UniqueEntityID {
    return this.props.userId
  }
  public get subject (): string {
    return this.props.subject
  }
  public get message (): string {
    return this.props.message ?? ''
  }

  public get routePath (): string | undefined {
    return this.props.routePath
  }
  public get eventType (): EventType {
    return this.props.eventType
  }

  public static hydrate (id: UniqueEntityID, props: NotificationProps) {
    return new NotificationEntity(props, id)
  }
}
