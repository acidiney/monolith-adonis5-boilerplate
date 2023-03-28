import Route from '@ioc:Adonis/Core/Route'
import { routeAdapter } from 'app/core/adapters/route-adapter'
import { makeLogoutFactory, makeSignInController } from './factories'
import { makeSendResetPasswordController } from './factories/send-reset-password-link-factory'
import {makeResetPasswordFactory} from 'app/modules/auth/framework/main/factories/reset-password-factory'

Route.group(() => {
  Route.get('/', ({ response }) => {
    response.redirect('/auth/login')
  })

  Route.get('/login', routeAdapter({
    perform: async ({ inertia }) => {
      return inertia.render('auth/framework/views/login')
    },
  }, {
    operation: 'view-login-page',
    description: 'View login page',
  }))

  Route.get('/reset/password', routeAdapter({
    perform: async ({ inertia }) => {
      return inertia.render('auth/framework/views/send-reset-password-link')
    },
  }, {
    operation: 'view-reset-password-notification-page',
    description: 'View send reset password notification page',
  }))

  Route.get('/reset/password/:token', ({ params, inertia }) => {
    const { token } = params

    return inertia.render('auth/framework/views/reset-password', { token })
  })

  Route.post('/reset/send-mail',
    routeAdapter(makeSendResetPasswordController(), {
      operation: 'send-reset-password-mail',
      description: 'A user can ask for a recovery token',
    })
  )

  Route.post('/reset/password',
    routeAdapter(makeResetPasswordFactory(), {
      operation: 'reset-password',
      description: 'Reset a user password using token and password',
    })
  )

  Route.post('/login',routeAdapter(makeSignInController(), {
    operation: 'do-login',
    description: 'Authenticate a user',
  }))

  Route.post('/logout', routeAdapter(makeLogoutFactory(), {
    operation: 'do-logout',
    description: 'Logout a user',
  }))
    .middleware(['auth'])
}).prefix('auth')
