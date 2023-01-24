import Route from '@ioc:Adonis/Core/Route'
import { makeInstallAddonControllerFactory } from './factories/install-addons-factory'
import { makeListAddonsControllerFactory } from './factories/list-addons-factory'

Route.group(() => {
  Route.get('/settings/marketplace', async (ctx) => makeListAddonsControllerFactory().index(ctx))
  Route.post('/settings/marketplace/addon/install', async (ctx) => makeInstallAddonControllerFactory().index(ctx))
})
  .middleware(['auth'])
  .prefix('/admin')
