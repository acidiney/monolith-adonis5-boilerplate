import {Controller} from 'app/core/ports'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {DeleteRoleUseCase} from 'app/modules/admin/settings/acl/roles-management/domain'
import {
  DeleteRoleValidation,
} from 'app/modules/admin/settings/acl/roles-management/framework/main/validations/delete-role-validation'

export class DeleteRoleController implements Controller<HttpContextContract> {
  constructor (
    private readonly deleteRoleUseCase: DeleteRoleUseCase
  ) {
  }

  public async perform ({ auth, request, i18n, session, response }: HttpContextContract): Promise<any> {
    if (!auth.user) {
      return response.redirect().status(403).back()
    }

    const validation = await request.validate(DeleteRoleValidation)
      .catch(() => {})

    if (!validation) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage('admin.acl.role.delete_role.role_id_missing'),
      })
      return response.redirect().back()
    }

    const userId = auth.user.id

    await auth.user.load('role')

    const output = await this.deleteRoleUseCase.perform({
      roleId: validation.roleId,
      userId,
      isRoot: auth.user.role.isRoot ?? false,
    })

    if (output.isLeft()) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage(output.value.errorMessage),
      })

      return response.redirect().withQs().back()
    }

    session.flash('alert', {
      success: true,
      message: i18n.formatMessage('admin.acl.role.role_deleted'),
    })

    return response.redirect().withQs().back()
  }
}
