import { SendResetPasswordUseCaseImpl } from 'app/modules/auth/usecases'
import { HashDriverAdapterImpl } from '../../infra/adapters/hash-driver-adapter-impl'
import { FindUsernameRepositoryImpl } from '../../infra/db/repositories/find-username-repository-impl'
import { GenerateResetPasswordTokenRepositoryImpl }
  from '../../infra/db/repositories/generate-reset-password-token/generate-reset-password-token-repository-impl'
import { SendResetPasswordServiceImpl } from '../../infra/services'
import { SendResetPasswordController } from '../controllers/send-reset-password-controller'

export const makeSendResetPasswordController = (): SendResetPasswordController =>
  new SendResetPasswordController(
    new SendResetPasswordUseCaseImpl(
      new FindUsernameRepositoryImpl(),
      new GenerateResetPasswordTokenRepositoryImpl(
        new HashDriverAdapterImpl()
      ),
      new SendResetPasswordServiceImpl()
    )
  )
