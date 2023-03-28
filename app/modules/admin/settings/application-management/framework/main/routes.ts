import Route from '@ioc:Adonis/Core/Route'
import { makePersistAppSettingControllerFactory } from './factories'
import {routeAdapter} from 'app/core/adapters/route-adapter'
import { makeShowAppSettingFactory } from './factories/make-show-app-setting-controller'
Route.group(() => {
  Route.get('/', ({ response }) => {
    return response.redirect('/account/dashboard')
  })

  Route.get('/application', routeAdapter(makeShowAppSettingFactory(), {
    operation: 'account-view-settings-color-page',
    description: 'View  Setting Color Page',
  }))
  Route.put('/appSettings', routeAdapter(makePersistAppSettingControllerFactory(), {
    operation: 'admin-acl-create-app-settings',
    description: '[AdminRoute] Create a app settings',
  }, false))
}).prefix('/admin/settings')

