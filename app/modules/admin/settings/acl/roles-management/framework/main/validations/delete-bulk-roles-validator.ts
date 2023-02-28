import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export class DeleteBulkRolesValidator {
  constructor (
    protected readonly ctx: HttpContextContract
  ) {}

  public readonly schema = schema.create({
    roles: schema.array([rules.minLength(1)]).members(schema.string()),
  })

  public readonly messages = {}
}
