import { Handler } from 'app/infra/listeners/handler'
import { AppSettingModified } from '../../../domain'

export class LogAppSettingListener extends Handler<AppSettingModified> {
  public async handle (event: AppSettingModified): Promise<void> {
    console.log('implement log', event)
  }
}
