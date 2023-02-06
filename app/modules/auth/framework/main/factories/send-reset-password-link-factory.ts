import { SendResetPasswordUseCaseImpl } from 'app/modules/auth/usecases'
import { HashDriverAdapterImpl } from 'app/modules/auth/framework/infra/adapters'
import { FindUsernameRepositoryImpl, PersistResetPasswordTokenRepositoryImpl}
  from 'app/modules/auth/framework/infra/db/repositories'

import { SendResetPasswordServiceImpl } from '../../infra/services'
import { SendResetPasswordController } from '../controllers/send-reset-password-controller'

export const makeSendResetPasswordController = (): SendResetPasswordController =>
  new SendResetPasswordController(
    new SendResetPasswordUseCaseImpl(
      new FindUsernameRepositoryImpl(),
      new HashDriverAdapterImpl(),
      new PersistResetPasswordTokenRepositoryImpl(),
      new SendResetPasswordServiceImpl()
    )
  )
