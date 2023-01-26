import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class SendResetPasswordLinkValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({}, [rules.email()]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {
    'username.required': this.ctx.i18n.formatMessage('auth.validation.username.required'),
    'username.email': this.ctx.i18n.formatMessage('auth.validation.username.email'),
  }
}
