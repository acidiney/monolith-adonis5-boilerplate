import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
export class CreateUserValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    firstName: schema.string({}, [ rules.required(), rules.trim()]),
    lastName: schema.string({}, [ rules.required(), rules.trim()]),
    email: schema.string({}, [ rules.required(), rules.email()]),
    role: schema.string({}, [ rules.required(), rules.trim()]),
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
