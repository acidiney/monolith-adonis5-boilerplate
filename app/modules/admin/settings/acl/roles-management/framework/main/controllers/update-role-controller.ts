import { Controller } from 'app/core/ports'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { UpdateRoleUseCase } from '../../../domain'
import { UpdateRoleValidation } from '../validations/update-role-validation'

export class UpdateRoleController implements Controller<HttpContextContract> {
  constructor (
    private readonly updateRoleUseCase: UpdateRoleUseCase
  ) {}

  public async perform ({ auth, session, i18n, request, response }: HttpContextContract): Promise<any> {
    const validation = await request.validate(UpdateRoleValidation)
      .catch((e) => {
        session.flash('alert', {
          success: false,
          message: e.message,
        })
      })

    if (!validation) {
      return response.redirect().back()
    }

    const userId = auth.user?.id

    await auth.user?.load('role')

    if (!userId) {
      return response.redirect().back()
    }

    const output = await this.updateRoleUseCase.perform({
      isRoot: auth.user?.role.isRoot ?? false,
      roleSlug: validation.roleSlug,
      name: validation.name,
      description: validation.description,
      permissions: validation.permissions,
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
      message: i18n.formatMessage('admin.acl.roles.updated'),
    })

    return response.redirect('/account/admin/settings/acl/roles')
  }
}
