import { DomainEvent, UniqueEntityID } from 'app/core/domain'

export interface ModifiedAppSettingProps {
  lastId: UniqueEntityID,
  currentId:UniqueEntityID

}

export class AppSettingModifiedEvent extends DomainEvent<ModifiedAppSettingProps> {

}

