import 'module-alias/register'
import Route from '@ioc:Adonis/Core/Route'
import { loadContext as context } from 'app/infra/utils'
import { routeMemory, RouteMemoryAction } from './state'
import { resolve } from 'path'

const loadRoutes = (path: string) => {
  const req = context(path, true, /main\/routes\.(ts|js)$/)

  req.keys().forEach(async (filename: string) => {
    routeMemory.commit(RouteMemoryAction.PUSH_STATE, filename)
  })

  routeMemory.getState.forEach(async (filename: string) => {
    const m = await require(filename)
    return m
  })
}

;['../app/modules', './routes'].forEach((path) => {
  loadRoutes(resolve(__dirname, path))
})

Route.get('/', ({ auth, response }) => {
  if (!auth.user) {
    return response.redirect('auth')
  }

  return response.redirect('account')
})
