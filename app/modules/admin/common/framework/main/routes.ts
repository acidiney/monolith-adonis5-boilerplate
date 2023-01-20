import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', ({ response }) => {
    return response.redirect('/admin/account/dashboard')
  })

  Route.inertia('/dashboard', 'admin/common/framework/views/dashboard')
  Route.inertia('/profile', 'admin/common/framework/views/profile')
  Route.inertia('/settings', 'admin/common/framework/views/settings/general')
})
  .prefix('admin/account')
  .middleware(['auth'])
