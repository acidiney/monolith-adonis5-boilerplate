import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export class AddIndicatorsToDashboardValidator {
  public readonly schema = schema.create({
    indicators: schema.array().members(
      schema.object().members({
        id: schema.string([rules.required()]),
        label: schema.string.nullableAndOptional(),
        description: schema.string.nullableAndOptional(),
        size: schema.enum(['small', 'medium' , 'large']),
        order: schema.number([rules.required]),
      })
    ),
  })

  constructor (protected ctx: HttpContextContract) {}

  public readonly messages = {
    'indicators.*.id.required': this.ctx.i18n.formatMessage('admin.settings.dashboard-management.missing_indicator_id'),
    'indicators.*.size.enum': this.ctx.i18n.formatMessage('admin.settings.dashboard-managment.invalid_size_option'),
    'indicators.*.order.required': this.ctx.i18n.formatMessage('admin.settings.dashboard-management.missing_order'),
  }
}
