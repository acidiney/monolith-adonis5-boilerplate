import { EventDispatcher } from 'app/core/domain'
import { AppSettingModifiedEvent } from '../../domain'
import { LogAppSettingListener } from '../infra/listeners/app-setting-change'
import { NotifyAllUsersThatSettingWasChangedInRealtimeListener } from
  '../infra/listeners/notify-all-user-that-settings-was-changed'

EventDispatcher.getInstance().register(AppSettingModifiedEvent.name, new LogAppSettingListener())
  .register(AppSettingModifiedEvent.name, new NotifyAllUsersThatSettingWasChangedInRealtimeListener())
