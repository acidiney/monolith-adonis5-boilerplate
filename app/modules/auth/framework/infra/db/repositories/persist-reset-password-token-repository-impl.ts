import * as luxon from 'luxon'
import Env from '@ioc:Adonis/Core/Env'
import { UniqueEntityID } from 'app/core/domain'
import { PersistResetPasswordTokenRepository } from 'app/modules/auth/usecases'

import { TokenModel } from '../models/token-model'
import { TokenTypes } from 'app/modules/auth/domain'

export class PersistResetPasswordTokenRepositoryImpl implements PersistResetPasswordTokenRepository {
  public async persist (userId: UniqueEntityID, hash: string): Promise<void> {
    await TokenModel.create({
      userId: userId.toString(),
      token: hash,
      type: TokenTypes.RECOVER_PASSWORD,
      expiresAt: luxon.DateTime.fromJSDate(new Date()).plus({
        hour: Env.get('RESET_PASSWORD_EXPIRES_AT_PLUS_HOUR', 24),
      }),
    })
  }
}
