import Route from '@ioc:Adonis/Core/Route'

import { routeAdapter } from 'app/core/adapters/route-adapter'

import { makeInstallAddonControllerFactory } from './factories/install-addons-factory'
import { makeListAddonsControllerFactory } from './factories/list-addons-factory'

Route.group(() => {
  Route.get('/settings/marketplace',
    routeAdapter(makeListAddonsControllerFactory(), {
      operation: 'list-addons',
      description: 'Retrieve all available addons',
    })
  )

  Route.post('/settings/marketplace/addon/install',
    routeAdapter(makeInstallAddonControllerFactory(), {
      operation: 'install-addon',
      description: 'Install an addon',
    })
  )
})
  .middleware(['auth'])
  .prefix('/admin')
