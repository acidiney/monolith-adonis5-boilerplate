import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class InstallAddonValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    addonName: schema.string({}, [ rules.required(), rules.trim()]),
    version: schema.number([rules.required()]),
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
  }
}
