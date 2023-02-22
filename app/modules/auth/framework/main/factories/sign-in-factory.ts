import {AuthenticateUserUseCaseImpl} from 'app/modules/auth/usecases'

import { VerifyPasswordMatchAdapterImpl } from 'app/modules/auth/framework/infra/adapters'

import { SignInController } from '../controllers/sign-in-controller'
import {EventDispatcher} from 'app/core/domain'
import { FindUserToAuthenticateRepositoryImpl } from '../../infra/db/repositories'

export const makeSignInController = (): SignInController =>
  new SignInController(
    new AuthenticateUserUseCaseImpl(
      new FindUserToAuthenticateRepositoryImpl(),
      new VerifyPasswordMatchAdapterImpl(),
      EventDispatcher.getInstance()
    )
  )
