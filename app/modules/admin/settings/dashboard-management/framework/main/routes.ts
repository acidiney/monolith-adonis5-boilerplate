import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import { routeAdapter } from 'app/core/adapters/route-adapter'
import { makeAddIndicatorsToDashboardControllerFactory }
  from './factories/make-add-indicators-to-dashboard-controller-factory'

Route.group(() => {
  Route.get(
    '/',
    routeAdapter(
      {
        perform: async (ctx: HttpContextContract) => {
          return ctx.inertia.render(
            'admin/settings/dashboard-management/framework/views/view-dashboard-page'
          )
        },
      },
      {
        operation: 'view-dashboard-page',
        description: 'View the management dashboard page',
      }
    )
  )

  Route.put(
    '/:dashboardId',
    routeAdapter(makeAddIndicatorsToDashboardControllerFactory(), {
      operation: 'add-indicators-to-dashboard',
      description: 'Associate new indicators to dashboard',
    })
  )
})
  .prefix('/account/admin/settings/dashboard-management')
  .middleware(['auth'])
