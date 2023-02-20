import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
export class BlockUnblockValidator {
  constructor (protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({}, [ rules.required(), rules.trim()]),
    motivation: schema.string.optional({}, [ rules.nullable(), rules.trim()]),
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
