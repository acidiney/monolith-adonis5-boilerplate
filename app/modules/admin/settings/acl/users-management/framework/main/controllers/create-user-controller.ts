import {Controller} from 'app/core/ports'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {CreateUserUseCase} from 'app/modules/admin/settings/acl/users-management/domain'
import {
  CreateUserValidator,
} from 'app/modules/admin/settings/acl/users-management/framework/main/validations/create-user-validator'

export class CreateUserController implements Controller<HttpContextContract> {
  constructor (private readonly createUserUseCase: CreateUserUseCase) {
  }

  public async perform ({ session, request, response, i18n }: HttpContextContract): Promise<any> {
    const validation = await request.validate(CreateUserValidator)
      .catch((e) => {
        session.flash('errors', {
          message: e.message,
        })
      })

    if (!validation) {
      return response.redirect().back()
    }

    const output = await this.createUserUseCase.perform({
      lastName: validation.lastName,
      firstName: validation.firstName,
      email: validation.email,
      role: validation.role,
    })

    if (output.isLeft()) {
      session.flash('errors', {
        createUser: i18n.formatMessage(output.value.errorMessage),
      })
      return response.redirect().back()
    }

    session.flash('success', {
      createUser: i18n.formatMessage('admin.acl.user.new'),
    })

    return response.redirect().back()
  }
}
