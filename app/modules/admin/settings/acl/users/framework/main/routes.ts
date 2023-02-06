import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/users', () => {

  })
})
  .prefix('/admin/settings/acl')
  .middleware(['auth'])
