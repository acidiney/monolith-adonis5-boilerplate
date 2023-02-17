import Route from '@ioc:Adonis/Core/Route'
import { routeAdapter } from 'app/core/adapters/route-adapter'
import { makeShowSettingsPageControllerFactory } from './factories/make-show-settings-page-controller-factory'
import {
  makeUpdateUserNotificationsController,
} from 'app/modules/admin/common/framework/main/factories/make-update-user-notifications-controller'
import { makeUpdatePasswordControllerFactory } from './factories/make-update-password-controller-factory'

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

  Route.put('/settings/password', routeAdapter(makeUpdatePasswordControllerFactory(), {
    operation: 'update-my-password',
    description: 'Update my password',
  }))
})
  .prefix('account')
  .middleware(['auth'])

Route.group(() => {
  Route.put('/notifications', routeAdapter(makeUpdateUserNotificationsController(), {
    operation: 'update-user-notifications',
    description: '[Api] Update User Notifications',
  }, false))
})
  .prefix('api/account')
  .middleware(['auth'])
