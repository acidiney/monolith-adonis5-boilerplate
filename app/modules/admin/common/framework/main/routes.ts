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
import {
  makeRetrieveUserActivitiesControllerFactory,
} from 'app/modules/admin/common/framework/main/factories/make-retrieve-user-activities-controller-factory'

Route.group(() => {
  Route.get('/', ({ response }) => {
    return response.redirect('/account/dashboard')
  })

  Route.get('/dashboard', routeAdapter({
    perform: async ({ inertia }) => {
      return inertia.render('admin/common/framework/views/dashboard')
    },
  }, {
    operation: 'view-dashboard-page',
    description: 'View dashboard page',
  }))

  Route.get('/profile', routeAdapter({
    perform: async ({ inertia }) => {
      return inertia.render('admin/common/framework/views/profile')
    },
  }, {
    operation: 'view-user-profile-page',
    description: 'View user profile page',
  }))

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

  Route.get('/:userId/activities', routeAdapter(makeRetrieveUserActivitiesControllerFactory(), {
    operation: 'retrieve-top-recent-user-activities',
    description: '[Api] Retrieve most recent user activity',
  }))
})
  .prefix('api/account')
  .middleware(['auth'])
