import 'module-alias/register'
import { resolve } from 'path'
import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

import { loadContext as context } from 'app/infra/utils'
import { routeMemory, RouteMemoryAction } from './state'

const loadFiles = (path: string, pattern: any) => {
  const req = context(path, true, pattern)

  req.keys().forEach(async (filename: string) => {
    routeMemory.commit(RouteMemoryAction.PUSH_STATE, filename)
  })

  routeMemory.getState.forEach(async (filename: string) => {
    const m = await require(filename)
    return m
  })
}

;['../app/modules', './routes'].forEach((path) => {
  loadFiles(resolve(__dirname, path), /main\/events\.(ts|js)$/)
  loadFiles(resolve(__dirname, path), /main\/routes\.(ts|js)$/)
})

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})

Route.get('/', ({ auth, response }) => {
  if (!auth.user) {
    return response.redirect('auth')
  }

  return response.redirect('account')
})
