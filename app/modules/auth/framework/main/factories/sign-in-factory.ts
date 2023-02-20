import {AuthenticateUserUseCaseImpl} from 'app/modules/auth/usecases'

import {
  FindUsernameEmailRepositoryImpl,
} from 'app/modules/@shared/framework/infra/db'
import { VerifyPasswordMatchAdapterImpl } from 'app/modules/auth/framework/infra/adapters'

import { SignInController } from '../controllers/sign-in-controller'
import {EventDispatcher} from 'app/core/domain'

export const makeSignInController = (): SignInController =>
  new SignInController(
    new AuthenticateUserUseCaseImpl(
      new FindUsernameEmailRepositoryImpl(),
      new VerifyPasswordMatchAdapterImpl(),
      EventDispatcher.getInstance()
    )
  )
