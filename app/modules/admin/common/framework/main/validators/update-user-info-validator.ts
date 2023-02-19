import {rules, schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class UpdateUserInfoValidator {
  constructor (
    protected readonly ctx: HttpContextContract
  ) {}

  public readonly schema = schema.create({
    avatar: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png'],
    }),
    firstName: schema.string({ trim: true }, [ rules.required() ]),
    lastName: schema.string({ trim: true }, [ rules.required() ]),
  })

  public readonly messages = {
    'avatar.size': this.ctx.i18n.formatMessage('common.avatar.max_size'),
    'avatar.extnames': this.ctx.i18n.formatMessage('common.avatar.extnames'),
    'firstName.required': this.ctx.i18n.formatMessage('common.first_name.required'),
    'lastName.required': this.ctx.i18n.formatMessage('common.last_name.required'),
  }
}
