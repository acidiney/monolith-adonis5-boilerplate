import { Handler } from 'app/infra/listeners/handler'
import { AppSettingModifiedEvent } from '../../../domain'

// TODO: FILENAME NEED TO BE REFACTORED @ernesto.maria
export class LogAppSettingListener extends Handler<AppSettingModifiedEvent> {
  public async handle (event: AppSettingModifiedEvent): Promise<void> {
    console.log('implement log', event)
  }
}
