/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import * as Sentry from '@sentry/node'

export default class ExceptionHandler extends HttpExceptionHandler {
  protected statusPages = {
    '403': 'errors/unauthorized',
    '404': 'errors/not-found',
    '500..599': 'errors/server-error',
  }

  constructor () {
    super(Logger)
  }
  protected context (ctx: HttpContextContract) {
    return {
      userId: ctx.auth.user?.id,
    }
  }
  public async report (error) {
    if (!['E_ROUTE_NOT_FOUND', 'E_UNAUTHORIZED_ACCESS'].includes(error.code)) {
      Sentry.configureScope(scope => {
        scope.setExtra(error.code, error)
      })

      Sentry.captureException(error)
    }
  }
}
