import Route from '@ioc:Adonis/Core/Route'
import { makePersistAppSettingControllerFactory } from './factories'
import {routeAdapter} from 'app/core/adapters/route-adapter'
Route.group(() => {
  Route.post('/appSettings', routeAdapter(makePersistAppSettingControllerFactory(), {
    operation: 'admin-acl-create-app-settings',
    description: '[AdminRoute] Create a app settings',
  }, false))
}).prefix('/account/admin/settings/acl')

