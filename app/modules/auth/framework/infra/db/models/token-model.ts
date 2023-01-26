import { cuid } from '@ioc:Adonis/Core/Helpers'
import { DateTime } from 'luxon'
import * as crypto from 'crypto'

import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'

export enum TokenTypes {
  RECOVER_PASSWORD = 'recover_password',
}

export class TokenModel extends BaseModel {
  public static table = 'tokens'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public type: TokenTypes

  @column()
  public token: string

  @column()
  public isRevoked: boolean

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime()
  public expires_at: DateTime

  @beforeCreate()
  public static async setId (model: TokenModel) {
    model.id = model.id || cuid()
  }

  @beforeCreate()
  public static async generateToken (model: TokenModel) {
    model.token = await crypto.randomBytes(32).toString('hex')
  }
}
