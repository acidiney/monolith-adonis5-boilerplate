import {rules, schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class UpdatePasswordValidator {
  constructor (
    protected readonly ctx: HttpContextContract
  ) {}

  public readonly schema = schema.create({
    currentPassword: schema.string({ trim: true }, [ rules.required(), rules.minLength(8) ]),
    newPassword: schema.string({ trim: true }, [ rules.required(), rules.minLength(8) ]),
    confirmPassword: schema.string({ trim: true }, [ rules.required(), rules.minLength(8) ]),
  })

  public readonly messages = {}
}
