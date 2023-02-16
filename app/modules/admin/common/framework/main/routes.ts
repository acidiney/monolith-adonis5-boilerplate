import Route from '@ioc:Adonis/Core/Route'
import { routeAdapter } from 'app/core/adapters/route-adapter'
import { makeShowSettingsPageControllerFactory } from './factories/make-show-settings-page-controller-factory'

Route.group(() => {
  Route.get('/', ({ response }) => {
    return response.redirect('/account/dashboard')
  })

  Route.inertia('/dashboard', 'admin/common/framework/views/dashboard')
  Route.inertia('/profile/:slug', 'admin/common/framework/views/profile')

  Route.get('/settings', routeAdapter(makeShowSettingsPageControllerFactory(), {
    operation: 'account-view-settings-page',
    description: 'View Account Setting Page',
  }))
})
  .prefix('account')
  .middleware(['auth'])
