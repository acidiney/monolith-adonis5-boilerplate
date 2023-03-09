import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export class PersistAppSettindValidator{
  constructor (protected readonly ctx:HttpContextContract) { }

  public readonly schema = schema.create({
    appName:schema.string({ trim: true }, [ rules.required(), rules.minLength(8) ]),
    appDesc:schema.string({ trim: true }, [ rules.required(), rules.minLength(8) ]),
    appColorPrimary:schema.string({ trim: true }, [ rules.required() ]),
    appColorSecundary:schema.string({ trim: true }, [ rules.required() ]),
    appBackgroundPrimaryColor:schema.string({ trim: true }, [ rules.required() ]),
    appBackgroundSecundaryColor:schema.string({ trim: true }, [ rules.required()]),
  })
  public readonly message={}
}
