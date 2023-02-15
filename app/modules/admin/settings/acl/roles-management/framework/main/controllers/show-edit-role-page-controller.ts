import {Controller} from 'app/core/ports'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {FindPermissionsUseCase, FindRoleUseCase} from 'app/modules/admin/settings/acl/roles-management/domain'

export class ShowEditRolePageController implements Controller<HttpContextContract> {
  constructor (
    private readonly findPermissionsUseCase: FindPermissionsUseCase,
    private readonly findRoleUseCase: FindRoleUseCase,
  ) {
  }

  public async perform ({ auth, params, session, i18n, response, inertia }: HttpContextContract): Promise<any> {
    await auth.user?.load('role')

    const { roleSlug } = params
    const isRoot = auth.user?.role.isRoot ?? false

    const permissions = await this.findPermissionsUseCase.perform({
      isRoot,
    })

    const roleOrError = await this.findRoleUseCase.perform({
      roleSlug,
      isRoot,
    })

    if (roleOrError.isLeft()) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage(roleOrError.value.errorMessage),
      })

      return response.redirect().back()
    }

    return inertia.render('admin/settings/acl/roles-management/framework/views/edit-role', {
      role: roleOrError.value,
      permissions,
    })
  }
}
