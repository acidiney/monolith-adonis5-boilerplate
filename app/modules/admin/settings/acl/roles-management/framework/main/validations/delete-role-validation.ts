import {rules, schema} from '@ioc:Adonis/Core/Validator'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class DeleteRoleValidation {
  constructor (
    protected readonly ctx: HttpContextContract
  ) {
  }

  public schema = schema.create({
    roleId: schema.string({ trim: true }, [ rules.required() ]),
  })

  public message = {
    'roleId.required': this.ctx.i18n.formatMessage('admin.acl.role.delete_role'),
  }
}
