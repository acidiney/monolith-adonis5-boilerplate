import {IHandler} from 'app/core/domain'
import { RoleUpdatedEvent } from '../../../domain/events'

export class RoleUpdatedListener implements IHandler<RoleUpdatedEvent> {
  public handle (event: RoleUpdatedEvent): void {
    console.log(event)
  }
}
