import Route from '@ioc:Adonis/Core/Route'
import { routeAdapter } from 'app/core/adapters/route-adapter'
import { makeLogoutFactory, makeSignInController } from './factories'
import { makeSendResetPasswordController } from './factories/send-reset-password-link-factory'

Route.group(() => {
  Route.get('/', ({ response }) => {
    response.redirect('/auth/login')
  })

  Route.inertia('/login', 'auth/framework/views/login')
  Route.inertia('/reset/password', 'auth/framework/views/send-reset-password-link')
  Route.get('/reset/password/:token', ({ params, inertia }) => {
    const { token } = params

    return inertia.render('auth/reset-password', { token })
  })

  Route.post('/reset/send-mail',
    routeAdapter(makeSendResetPasswordController(), {
      operation: 'send-reset-password-mail',
      description: 'A user can ask for a recovery token',
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
