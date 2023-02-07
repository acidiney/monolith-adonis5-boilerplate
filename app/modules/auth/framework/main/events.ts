import {EventDispatcher} from 'app/core/domain'
import {UserLoggedEvent} from 'app/modules/auth/domain/events/user-logged-event'
import {UserLoggedListener} from 'app/modules/auth/framework/infra/listeners/user-logged-listener'
import {FindUserIdRepositoryImpl, UpdateUserRepositoryImpl} from 'app/modules/auth/framework/infra/db/repositories'
import {UserMapper} from 'app/modules/auth/framework/infra/db/mappers/user-mapper'

EventDispatcher
  .getInstance()
  .register(UserLoggedEvent.name, new UserLoggedListener(
    new FindUserIdRepositoryImpl(),
    new UpdateUserRepositoryImpl(new UserMapper())
  ))
