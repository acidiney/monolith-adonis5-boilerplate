import { Handler } from 'app/infra/listeners/handler'
import { AppSettingModifiedEvent } from '../../../domain/events'

import Event from '@ioc:Adonis/Core/Event'
//import { AppSettingModel } from '../db'

export class NotifyAllUsersThatSettingWasChangedInRealtimeListener extends Handler<AppSettingModifiedEvent> {
  public async handle (event: AppSettingModifiedEvent): Promise<void> {
  /*   const role = await AppSettingModel
      .query()
      .firstOrFail() */

    const ctx = super.ctx()

    if (!ctx) {
      return
    }

    void Event.emit('alert:realtime:broadcast:all', {
      title: ctx.i18n.formatMessage('admin.application.settings.updated'),
      message: ctx.i18n.formatMessage('admin.application.settings.description'),
      type: 'info',
      eventName: 'SETTINGS_UPDATED',
      icon: 'message',
    })
  }
}
