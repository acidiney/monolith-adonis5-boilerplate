import { DateTime } from 'luxon'
import * as crypto from 'crypto'

import {TokenType} from 'app/modules/auth/domain'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export class TokenModel extends BaseModel {
  public static table = 'tokens'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public type: TokenType

  @column()
  public token: string

  @column()
  public isRevoked: boolean

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public expiresAt: DateTime

  @beforeCreate()
  public static async setId (model: TokenModel) {
    model.id = model.id || cuid()
  }

  @beforeCreate()
  public static async generateToken (model: TokenModel) {
    model.token = await crypto.randomBytes(32).toString('hex')
  }
}
