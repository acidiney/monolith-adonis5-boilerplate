import { BaseModel, column, computed, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { TokenModel } from './token-model'

export default class LoginModel extends BaseModel {
  public static table = 'users'
  public static selfAssignPrimaryKey = true

  @column({ isPrimary: true })
  public id: string

  @column()
  public firstName: string

  @column()
  public lastName: string

  @column()
  public email: string

  @hasOne(() => TokenModel)
  public token: HasOne<typeof TokenModel>

  @column({ serializeAs: null })
  public password: string

  @computed()
  public get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
}
