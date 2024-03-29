/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {CoreRolePermissionModel} from 'app/modules/@shared/framework/infra/db/models'

export default class AclMiddleware {
  public async handle (
    { auth, session, i18n, response }: HttpContextContract,
    next: () => Promise<void>,
    guards: string[]
  ) {
    if (!auth.user) {
      session.flash('alertGlobal', {
        success: false,
        message: i18n.formatMessage('auth.user.not.authenticated'),
      })

      return response.redirect().back()
    }

    const permissions = await CoreRolePermissionModel
      .query()
      .where('role_id', auth.user.roleId)

    const haveAllPermissions = guards.every(g => {
      return permissions.find((p) => p.permissionId === g)
    })

    if (!haveAllPermissions) {
      session.flash('alertGlobal', {
        success: false,
        message: i18n.formatMessage('shared.missing.permissions'),
      })

      return response.redirect('/account/dashboard')
    }

    await next()
  }
}
