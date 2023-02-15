import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export class UpdateRoleValidation {
  constructor (protected readonly ctx: HttpContextContract) {}

  public schema = schema.create({
    roleSlug: schema.string({}, [
      rules.required(),
      rules.trim(),
    ]),
    name: schema.string({}, [
      rules.required(),
      rules.trim(),
    ]),
    description: schema.string({}, [
      rules.required(),
    ]),
    permissions: schema.array([rules.required()]).members(schema.string([])),
  })

  public messages = {
    'roleSlug.required': this.ctx.i18n.formatMessage('admin.acl.roles.roleSlug.required'),
    'name.required': this.ctx.i18n.formatMessage('admin.acl.roles.name.required'),
    'description.required': this.ctx.i18n.formatMessage('admin.acl.roles.description.required'),
    'description.*.required': this.ctx.i18n.formatMessage('admin.acl.roles.permissions.required'),
  }
}
