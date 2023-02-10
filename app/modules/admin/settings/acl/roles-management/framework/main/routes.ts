import Route from '@ioc:Adonis/Core/Route'
import {routeAdapter} from 'app/core/adapters/route-adapter'

import {
  makeListRolesFactory,
} from 'app/modules/admin/settings/acl/roles-management/framework/main/factories/make-list-roles-factory'
import {
  makeListDropdownRolesFactory,
} from 'app/modules/admin/settings/acl/roles-management/framework/main/factories/make-list-roles-dropdown-factory'

Route.group(() => {
  Route.get('/', routeAdapter(makeListRolesFactory(), {
    operation: 'admin-acl-list-roles',
    description: '[AdminRoute] List all roles',
  }))
    .middleware('can:admin-acl-view-roles')

  Route.inertia('/new', 'admin/settings/acl/roles-management/framework/views/create-role')
})
  .prefix('/account/admin/settings/acl/roles')
  .middleware(['auth'])

Route.group(() => {
  Route.get('/dropdown', routeAdapter(makeListDropdownRolesFactory(), {
    operation: 'admin-acl-list-dropdown-roles',
    description: '[AdminRoute] List all roles as options',
  }))
    .middleware('can:admin-acl-view-roles')
})
  .prefix('/api/admin/settings/acl/roles')
  .middleware(['auth'])
