import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CoreRolePermissionModel } from '../../modules/@shared/framework/infra/db/models'
import { CoreMenuModel } from '../../modules/@shared/framework/infra/db/models/core-menu-model'

export default class MenuMiddleware {
  public async handle (
    { auth, session, i18n }: HttpContextContract,
    next: () => Promise<void>
  ) {
    if (auth.isAuthenticated && auth.user) {
      const permissions = await CoreRolePermissionModel
        .query()
        .where('role_id', auth.user.roleId)

      if (permissions) {
        const data = await CoreMenuModel.loadMenuBasedInUserPermissions(permissions.map((p) => p.permissionId))

        session.put('menu', data)
      }

      if (!permissions) {
        session.flash('errors', i18n.formatMessage('menu.error.cannot_load_menu'))
      }
    }

    await next()
  }
}
