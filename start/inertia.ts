import { DateTime } from 'luxon'

import Inertia from '@ioc:EidelLev/Inertia'
import {UserModel} from 'app/modules/@shared/framework/infra/db/models'
import { DateAdapterImpl } from 'app/modules/@shared/framework/infra/adapters/date-adapter-impl'
const pkg = require('../package.json')

Inertia.share({
  alert: (ctx) => ctx.session.flashMessages.get('alert'),
  alertGlobal: (ctx) => ctx.session.flashMessages.get('alertGlobal'),
  user: async (ctx) => {
    if (ctx.auth.user) {
      const user = await UserModel.query()
        .preload('role', (builder) => {
          builder.preload('permissions')
        })
        .where('id', ctx.auth.user.id)
        .firstOrFail()

      return {
        slug: user.slug,
        email: user.email,
        fullName: user.fullName,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        lastLoginText: user.lastLoginAt && new DateAdapterImpl().toRelative(user.lastLoginAt.toJSDate()),
        lastLoginAt:  user.lastLoginAt && new DateAdapterImpl().format(user.lastLoginAt.toJSDate()),
        status: user.status,
        role: {
          isRoot: user.role.isRoot,
          name: user.role.name,
          slug: user.role.slug,
          internal: user.role.isSystem,
          description: user.role.description,
        },
        permissions: user.role.permissions?.map((p) => p.id),
      }
    }
    return
  },
  menu: (ctx) => ctx.session.get('menu'),
  headers: (ctx) => ctx.session.get('header'),
  version: pkg.version,
  copyright: DateTime.now().get('year'),
})
