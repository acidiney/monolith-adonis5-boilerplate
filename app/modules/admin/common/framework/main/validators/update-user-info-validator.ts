import {rules, schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class UpdateUserInfoValidator {
  constructor (
    protected readonly ctx: HttpContextContract
  ) {}

  public readonly schema = schema.create({
    firstName: schema.string({ trim: true }, [ rules.required() ]),
    lastName: schema.string({ trim: true }, [ rules.required() ]),
  })

  public readonly messages = {
    'firstName.required': this.ctx.i18n.formatMessage('common.first_name.required'),
    'lastName.required': this.ctx.i18n.formatMessage('common.last_name.required'),
  }
}
