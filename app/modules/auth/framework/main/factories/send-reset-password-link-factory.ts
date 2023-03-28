import { resolve } from 'path'
import { SendResetPasswordUseCaseImpl } from 'app/modules/auth/usecases'
import { HashDriverAdapterImpl } from 'app/modules/auth/framework/infra/adapters'
import { FindUserToAuthenticateRepositoryImpl, PersistResetPasswordTokenRepositoryImpl}
  from 'app/modules/auth/framework/infra/db/repositories'

import { SendResetPasswordServiceImpl } from '../../infra/services'
import { SendResetPasswordController } from '../controllers/send-reset-password-controller'
import {EventDispatcher} from 'app/core/domain'
import { BroadcastMessageRepositoryImpl } from 'app/modules/@shared/framework/infra'
import { EmailAdapterImpl } from 'app/modules/@shared/framework/infra/adapters/email-adapter-impl'

export const makeSendResetPasswordController = (): SendResetPasswordController =>
  new SendResetPasswordController(
    new SendResetPasswordUseCaseImpl(
      new FindUserToAuthenticateRepositoryImpl(),
      new HashDriverAdapterImpl(),
      new PersistResetPasswordTokenRepositoryImpl(),
      new SendResetPasswordServiceImpl(
        new BroadcastMessageRepositoryImpl(),
        new EmailAdapterImpl(resolve(__dirname, '../..', 'infra/resources'))
      ),
      EventDispatcher.getInstance()
    )
  )
