import { column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { UserModel } from 'app/infra/models'
import { TokenModel } from './token-model'

export default class LoginModel extends UserModel {
  @column({ columnName: 'role_id' })
  public roleId: string

  @hasOne(() => TokenModel)
  public token: HasOne<typeof TokenModel>
}
