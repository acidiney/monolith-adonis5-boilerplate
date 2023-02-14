import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

import {Controller} from 'app/core/ports'
import {CreateRoleUseCase} from 'app/modules/admin/settings/acl/roles-management/domain'
import {
  CreateRoleValidation,
} from '../validations/create-role-validation'

export class CreateRoleController implements Controller<HttpContextContract> {
  constructor (
    private readonly createRoleUseCase: CreateRoleUseCase
  ) {
  }

  public async perform ({ session, request, response, i18n, auth }: HttpContextContract): Promise<any> {
    if (!auth.user) {
      session.flash('errors', {
        message: i18n.formatMessage('auth.unauthorized'),
      })
      return response.redirect().back()
    }

    const validation = await request.validate(CreateRoleValidation)
      .catch((e) => {
        session.flash('alert', {
          success: false,
          message: e.message,
        })
      })

    if (!validation) {
      return response.redirect().back()
    }

    const output = await this.createRoleUseCase.perform({
      name: validation.name,
      description: validation.description,
      permissions: validation.permissions,
      userId: auth.user.id,
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
      message: i18n.formatMessage('admin.acl.role.role_created'),
    })

    return response.redirect().back()
  }
}
