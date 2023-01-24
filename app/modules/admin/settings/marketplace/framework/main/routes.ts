import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.inertia('/settings/marketplace', 'admin/settings/marketplace/framework/views/list-addons')
})
  .middleware(['auth'])
  .prefix('/admin')
