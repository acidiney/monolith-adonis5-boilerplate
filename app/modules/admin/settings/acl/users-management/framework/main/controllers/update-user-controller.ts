import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Controller } from 'app/core/ports'
import { UpdateUserUseCase } from '../../../domain'
import { CreateUserValidator } from '../validations/create-user-validator'

export class UpdateUserController implements Controller<HttpContextContract> {
  constructor (
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  public async perform ({ params, request, response, session, i18n }: HttpContextContract): Promise<any> {
    const { username } = params
    const validation = await request.validate(CreateUserValidator)
      .catch(() => {})

    if (!validation) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage('shared.missing.params'),
        successWithModal: true,
      })

      return response.redirect().back()
    }

    const output = await this.updateUserUseCase.perform({
      username,
      ...validation,
    })

    if (output.isLeft()) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage(output.value.errorMessage),
        successWithModal: true,
      })

      return response.redirect().back()
    }

    session.flash('alert', {
      success: true,
      message: i18n.formatMessage('admin.acl.users.user_updated'),
    })

    return response.redirect().back()
  }
}
