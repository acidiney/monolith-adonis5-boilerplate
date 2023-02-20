import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { Controller } from 'app/core/ports'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { RedefinePasswordUseCase } from '../../../domain'

export class RedefineUserPasswordController implements Controller<HttpContextContract> {
  constructor (
    private readonly redefineUserPasswordUseCase: RedefinePasswordUseCase
  ) {}

  public async perform ({ request, session, i18n, response }: HttpContextContract): Promise<any> {
    const validation = await request.validate({
      schema: schema.create({
        username: schema.string({ trim: true }, [ rules.required() ]),
      }),
    })
      .catch(() => {})

    if(!validation) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage('admin.acl.users.redefine_password.missing.params'),
      })

      return response.redirect().back()
    }

    const output = await this.redefineUserPasswordUseCase.perform({
      username: validation.username,
    })

    if (output.isLeft()) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage(output.value.errorMessage),
      })

      return response.redirect().back()
    }

    session.flash('alert', {
      successWithModal: true,
      message: i18n.formatMessage('admin.acl.users.password.redefined'),
      payload: {
        newPassword: output.value,
      },
    })

    return response.redirect().back()
  }
}
