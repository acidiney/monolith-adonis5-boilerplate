import Route from '@ioc:Adonis/Core/Route'

import { routeAdapter } from 'app/core/adapters/route-adapter'

import { makeInstallAddonControllerFactory } from './factories/install-addons-factory'
import { makeListAddonsControllerFactory } from './factories/list-addons-factory'

Route.group(() => {
  Route.get('/settings/marketplace',
    routeAdapter(makeListAddonsControllerFactory(), {
      operation: 'admin-list-addons',
      description: '[AdminRoute] Retrieve all available addons',
    })
  )

  Route.post('/settings/marketplace/addon/install',
    routeAdapter(makeInstallAddonControllerFactory(), {
      operation: 'admin-install-addon',
      description: '[AdminRoute] Install an addon',
    })
  )
})
  .middleware(['auth'])
  .prefix('/admin')
