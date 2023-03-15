import { EventDispatcher } from 'app/core/domain'
import { AppSettingModified } from '../../domain'
import { LogAppSettingListener } from '../infra/listeners/app-setting-change'

EventDispatcher.getInstance().register(AppSettingModified.name, new LogAppSettingListener())
