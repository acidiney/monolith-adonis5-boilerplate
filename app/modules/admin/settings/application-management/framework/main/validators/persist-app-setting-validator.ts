import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export class PersistAppSettindValidator{
  constructor (protected readonly ctx:HttpContextContract) { }

  public readonly schema = schema.create({
    appName:schema.string({ trim: true }, [ rules.required(), rules.minLength(2) ]),
    appDesc:schema.string({ trim: true }, [ rules.required(), rules.minLength(8) ]),
    appColorPrimary:schema.string({ trim: true }),
    appColorSecondary:schema.string({ trim: true }),
    appBackgroundPrimaryColor:schema.string({ trim: true }),
    appBackgroundSecondaryColor:schema.string({ trim: true }),
  })
  public readonly message = {
    'appName.required': this.ctx.i18n.formatMessage('admin.acl.roles.name.required'),
    'appDesc.required': this.ctx.i18n.formatMessage('admin.acl.roles.desc.required'),
    'appColorPrimary.required': this.ctx.i18n.formatMessage('admin.acl.roles.appColorPrimary.required'),
    'appColorSecondary.required': this.ctx.i18n.formatMessage('admin.acl.roles.appColorSecondary.required'),
    'appBackgroundPrimaryColor.required':
      this.ctx.i18n.formatMessage('admin.acl.roles.appBackgroundPrimaryColor.required'),
    'appBackgroundSecondaryColor.required':
      this.ctx.i18n.formatMessage('admin.acl.roles.appBackgroundSecondaryColor.required'),
  }
}
