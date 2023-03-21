import Route from '@ioc:Adonis/Core/Route'
import { routeAdapter } from 'app/core/adapters/route-adapter'
import { makeShowSettingsPageControllerFactory } from './factories/make-show-settings-page-controller-factory'
import {
  makeUpdateUserNotificationsController,
} from 'app/modules/admin/common/framework/main/factories/make-update-user-notifications-controller'
import { makeUpdatePasswordControllerFactory } from './factories/make-update-password-controller-factory'
import { makeUpdateUserInfoControllerFactory } from './factories/make-update-user-info-controller-factory'
import {
  makeRetrieveNewestNotificationsControllerFactory,
} from 'app/modules/admin/common/framework/main/factories/make-retrieve-newest-notifications-controller-factory'

Route.group(() => {
  Route.get('/', ({ response }) => {
    return response.redirect('/account/dashboard')
  })

  Route.inertia('/dashboard', 'admin/common/framework/views/dashboard')
  Route.inertia('/profile', 'admin/common/framework/views/profile')

  Route.get('/settings', routeAdapter(makeShowSettingsPageControllerFactory(), {
    operation: 'account-view-settings-page',
    description: 'View Account Setting Page',
  }))

  Route.put('/settings/password', routeAdapter(makeUpdatePasswordControllerFactory(), {
    operation: 'update-my-password',
    description: 'Update my password',
  }))

  Route.put('/settings/user/info', routeAdapter(makeUpdateUserInfoControllerFactory(), {
    operation: 'update-user-info',
    description: 'Update user info',
  }))
})
  .prefix('account')
  .middleware(['auth'])

Route.group(() => {
  Route.put('/notifications', routeAdapter(makeUpdateUserNotificationsController(), {
    operation: 'update-user-notifications',
    description: '[Api] Update User Notifications',
  }, false))

  Route.get('/me/notifications', routeAdapter(makeRetrieveNewestNotificationsControllerFactory(), {
    operation: 'retrieve-user-latest-unread-notifications',
    description: '[Api] Retrieve the newest unread user notifications',
  }))
})
  .prefix('api/account')
  .middleware(['auth'])
