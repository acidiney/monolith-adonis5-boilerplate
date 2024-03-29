import { resolve } from 'path'
import {EventDispatcher} from 'app/core/domain'
import {UserLoggedEvent} from 'app/modules/auth/domain/events/user-logged-event'
import {FindUserIdRepositoryImpl} from 'app/modules/auth/framework/infra/db/repositories'
import {
  SendUserLoggedNotificationListener,
  SetUserLatestLoginListener,
} from 'app/modules/auth/framework/infra/listeners'
import {BroadcastMessageRepositoryImpl} from 'app/modules/@shared/framework/infra'
import { EmailAdapterImpl } from 'app/modules/@shared/framework/infra/adapters/email-adapter-impl'

EventDispatcher
  .getInstance()
  .register(UserLoggedEvent.name, new SetUserLatestLoginListener(
    new FindUserIdRepositoryImpl(),
  ))
  .register(UserLoggedEvent.name, new SendUserLoggedNotificationListener(
    new BroadcastMessageRepositoryImpl(),
    new EmailAdapterImpl(resolve(__dirname, '..', 'infra/resources'))
  ))
