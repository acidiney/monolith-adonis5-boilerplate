import Route from '@ioc:Adonis/Core/Route'
import { makeLogoutFactory, makeSignInController } from './factories'

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

  // Route.post('/reset/send-mail', 'AuthController.sendResetPasswordMail')
  // Route.post('/reset/password/:token', 'AuthController.resetPassword')
  Route.post('/login', async (ctx) => makeSignInController().perform(ctx))
  Route.post('/logout', async (ctx) => makeLogoutFactory().perform(ctx)).middleware(['auth'])
}).prefix('auth')
