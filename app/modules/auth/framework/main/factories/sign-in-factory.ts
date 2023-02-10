import {AuthenticateUserUseCaseImpl} from 'app/modules/auth/usecases'

import {
  FindUsernameRepositoryImpl,
} from 'app/modules/shared/framework/infra/repositories/find-username-repository-impl'
import { VerifyPasswordMatchAdapterImpl } from 'app/modules/auth/framework/infra/adapters'

import { SignInController } from '../controllers/sign-in-controller'
import {EventDispatcher} from 'app/core/domain'

export const makeSignInController = (): SignInController =>
  new SignInController(
    new AuthenticateUserUseCaseImpl(
      new FindUsernameRepositoryImpl(),
      new VerifyPasswordMatchAdapterImpl(),
      EventDispatcher.getInstance()
    )
  )
