import {AuthenticateUserUseCaseImpl} from 'app/modules/auth/usecases'

import {
  FindUsernameRepositoryImpl,
} from 'app/modules/auth/framework/infra/db/repositories/find-username-repository-impl'
import { VerifyPasswordMatchAdapterImpl } from 'app/modules/auth/framework/infra/adapters'

import { SignInController } from '../controllers/sign-in-controller'

export const makeSignInController = (): SignInController =>
  new SignInController(
    new AuthenticateUserUseCaseImpl(
      new FindUsernameRepositoryImpl(),
      new VerifyPasswordMatchAdapterImpl()
    )
  )
