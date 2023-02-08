import Route from '@ioc:Adonis/Core/Route'
import {routeAdapter} from 'app/core/adapters/route-adapter'

import {
  makeListRolesFactory,
} from 'app/modules/admin/settings/acl/roles-management/framework/main/factories/make-list-roles-factory'

Route.group(() => {
  Route.get('/roles', routeAdapter(makeListRolesFactory(), {
    operation: 'admin-acl-list-roles',
    description: '[AdminRoute] List all roles',
  }))
})
  .prefix('/admin/settings/acl')
  .middleware(['auth'])
