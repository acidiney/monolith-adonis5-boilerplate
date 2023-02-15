import Route from '@ioc:Adonis/Core/Route'
import {routeAdapter} from 'app/core/adapters/route-adapter'

import {
  makeListRolesFactory,
  makeListDropdownRolesFactory,
  makeShowCreateRolePageControllerFactory,
  makeCreateRoleControllerFactory, makeShowEditRolePageControllerFactory,
} from './factories'
import {
  makeDeleteRoleFactory,
} from 'app/modules/admin/settings/acl/roles-management/framework/main/factories/make-delete-role-factory'

Route.group(() => {
  Route.get('/', routeAdapter(makeListRolesFactory(), {
    operation: 'admin-acl-list-roles',
    description: '[AdminRoute] List all roles',
  }))
    .middleware('can:admin-acl-view-roles')

  Route.get('/new', routeAdapter(makeShowCreateRolePageControllerFactory(), {
    operation: 'admin-acl-view-create-role-page',
    description: '[AdminRoute] View create role page',
  }))
    .middleware('can:admin-acl-create-role')

  Route.post('/create', routeAdapter(makeCreateRoleControllerFactory(), {
    operation: 'admin-acl-create-role',
    description: '[AdminRoute] Create a new role',
  }))
    .middleware('can:admin-acl-create-role')

  Route.delete('/delete', routeAdapter(makeDeleteRoleFactory(), {
    operation: 'admin-acl-delete-route',
    description: '[AdminRoute] Delete a role',
  }))

  Route.get('/:roleSlug/edit', routeAdapter(makeShowEditRolePageControllerFactory(), {
    operation: 'admin-acl-view-edit-role-page',
    description: '[AdminRoute] View edit role page',
  }))
    .middleware('can:admin-acl-modify-role')
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
