import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import { routeAdapter } from 'app/core/adapters/route-adapter'

Route.group(() => {
  Route.get('/', routeAdapter({
    perform: async (ctx: HttpContextContract) => {
      return ctx.inertia.render('admin/settings/dashboard-management/framework/views/view-dashboard-page')
    },
  }, {
    operation: 'view-dashboard-page',
    description: 'View the management dashboard page',
  }))
    .middleware(['auth'])
}).prefix('/account/admin/settings/dashboard-management')
