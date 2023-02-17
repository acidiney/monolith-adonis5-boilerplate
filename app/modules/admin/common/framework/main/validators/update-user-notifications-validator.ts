import {rules, schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class UpdateUserNotificationsValidator {
  constructor (
    protected readonly ctx: HttpContextContract
  ) {
  }
  public readonly schema = schema.create({
    notificationId: schema.array().members(schema.string([ rules.required(), rules.trim() ])),
    type: schema.string({ trim: true }, [ rules.required() ]),
  })

  public readonly messages = {}
}
