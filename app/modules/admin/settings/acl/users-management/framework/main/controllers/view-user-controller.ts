import { Controller } from 'app/core/ports'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { FindUserUseCase } from '../../../domain'

export class ViewUserController implements Controller<HttpContextContract> {
  constructor (
    private readonly findUserUseCase: FindUserUseCase
  ) {}

  public async perform ({ params, i18n, session, response, inertia }: HttpContextContract): Promise<any> {
    const { username } = params

    const output = await this.findUserUseCase.perform({ username })

    if (output.isLeft()) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage(output.value.errorMessage),
      })

      return response.redirect().back()
    }

    return inertia.render('admin/common/framework/views/profile', {
      data: output.value,
    })
  }
}
