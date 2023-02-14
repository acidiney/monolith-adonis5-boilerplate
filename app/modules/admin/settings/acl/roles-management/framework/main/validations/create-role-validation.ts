import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export class CreateRoleValidation {
  constructor (protected readonly ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.required(),
      rules.trim(),
    ]),
    description: schema.string({}, [
      rules.required(),
    ]),
    permissions: schema.array([rules.required()]).members(schema.string([])),
    redirect: schema.boolean(),
  })

  public messages = {
    'name.required': this.ctx.i18n.formatMessage('admin.acl.roles.name.required'),
    'description.required': this.ctx.i18n.formatMessage('admin.acl.roles.description.required'),
    'description.*.required': this.ctx.i18n.formatMessage('admin.acl.roles.permissions.required'),
  }
}
