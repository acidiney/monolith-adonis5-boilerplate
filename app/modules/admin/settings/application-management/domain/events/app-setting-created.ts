import { IDomainEvent, UniqueEntityID } from 'app/core/domain'

export interface CreatedAppSettingEventData {

  appName:string;
  appDesc:string;
  appColorPrimary:string;
  appColorSecondary:string;
  appBackgroundPrimaryColor:string;
  appBackgroundSecondaryColor:string;

}

export class AppSettingCreated implements IDomainEvent {
  public dateTimeOccurred: Date

  public eventData: CreatedAppSettingEventData

  constructor (protected readonly _data: CreatedAppSettingEventData) {
    this.dateTimeOccurred = new Date()

    this.eventData = _data
  }

  public eventId (): UniqueEntityID {
    return new UniqueEntityID()
  }
}

