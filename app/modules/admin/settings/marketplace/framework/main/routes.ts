import Route from '@ioc:Adonis/Core/Route'
import { makeListAddonsControllerFactory } from './factories/list-addons-factory'

Route.group(() => {
  Route.get('/settings/marketplace', async (ctx) => makeListAddonsControllerFactory().index(ctx))
})
  .middleware(['auth'])
  .prefix('/admin')
