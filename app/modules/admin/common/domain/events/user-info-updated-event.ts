import {DomainEvent, UniqueEntityID} from 'app/core/domain'

export interface UserInfoUpdatedProps {
  userId: UniqueEntityID
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
