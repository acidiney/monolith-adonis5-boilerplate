import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export class ResetPasswordValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    token: schema.string({}, [rules.required(), rules.trim()]),
    password: schema.string({}, [rules.required(), rules.minLength(8), rules.trim()]),
    confirmPassword: schema.string({}, [rules.equalTo('password')]),
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
    'token.required': this.ctx.i18n.formatMessage('auth.validation.token.required'),
    'password.required': this.ctx.i18n.formatMessage('auth.validation.password.required'),
    'password.minLength': this.ctx.i18n.formatMessage('auth.validation.password.minLength'),
    'confirmPassword.equalTo': this.ctx.i18n.formatMessage('auth.validation.confirmPassword.mismatch'),
  }
}
