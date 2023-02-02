import * as luxon from 'luxon'
import { UniqueEntityID } from 'app/core/domain'
import { GenerateResetPasswordTokenRepository } from 'app/modules/auth/usecases'

import { HashAdapter } from './ports/hash-adapter'
import { TokenModel } from '../../models/token-model'
import {TokenTypes} from 'app/modules/auth/domain'

export class GenerateResetPasswordTokenRepositoryImpl implements GenerateResetPasswordTokenRepository {
  constructor (
    private readonly hashAdapter: HashAdapter
  ) {}

  public async generate (userId: UniqueEntityID): Promise<string> {
    const hash = await this.hashAdapter.generate(userId.toString(), TokenTypes.RECOVER_PASSWORD)

    await TokenModel.create({
      userId: userId.toString(),
      token: hash,
      type: TokenTypes.RECOVER_PASSWORD,
      expiresAt: luxon.DateTime.fromJSDate(new Date()).plus({
        hour: 24,
      }),
    })

    return hash
  }
}
