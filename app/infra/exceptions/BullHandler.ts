/*
|--------------------------------------------------------------------------
| Bull Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an BULL job execution to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `BullExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import * as Sentry from '@sentry/node'
import { Job } from '@ioc:Rocketseat/Bull'
import Logger from '@ioc:Adonis/Core/Logger'
import BullExceptionHandler from '@ioc:Rocketseat/Bull/BullExceptionHandler'

export default class JobExceptionHandler extends BullExceptionHandler {
  constructor () {
    super(Logger)
  }

  public async handle (error: Error, job: Job) {
    this.logger.error(`key=${job.name} id=${job.id} error=${error.message}`)
    Sentry.configureScope(scope => {
      scope.setExtra(job.name, job)
    })

    Sentry.captureException(error)
  }
}
