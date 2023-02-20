import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { Controller } from 'app/core/ports'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { DeleteUserUseCase } from '../../../domain'

export class DeleteUserController implements Controller<HttpContextContract> {
  constructor (
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  public async perform ({ request, session, i18n, response }: HttpContextContract): Promise<any> {
    const validation = await request.validate({
      schema: schema.create({
        username: schema.string({ trim: true }, [ rules.required() ]),
        motivation: schema.string({ trim: true }, [ rules.nullable() ]),
      }),
    })
      .catch(() => {})

    if(!validation) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage('admin.acl.users.delete.missing.params'),
      })

      return response.redirect().back()
    }

    const output = await this.deleteUserUseCase.perform({
      username: validation.username,
      motivation: validation.motivation,
    })

    if (output.isLeft()) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage(output.value.errorMessage),
      })

      return response.redirect().back()
    }

    session.flash('alert', {
      success: true,
      message: i18n.formatMessage('admin.acl.users.deleted'),
    })

    return response.redirect().back()
  }
}
