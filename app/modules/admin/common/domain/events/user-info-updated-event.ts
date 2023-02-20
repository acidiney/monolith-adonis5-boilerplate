import { DomainEvent } from 'app/core/domain'

export interface UserInfoUpdatedProps {
  old: {
    avatarUrl?: string,
    firstName: string
    lastName: string
  },
  new: {
    avatarUrl?: string,
    firstName: string,
    lastName: string
  }
}

export class UserInfoUpdatedEvent extends DomainEvent<UserInfoUpdatedProps> {}
