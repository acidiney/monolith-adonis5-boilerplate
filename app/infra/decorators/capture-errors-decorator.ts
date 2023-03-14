import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import '@sentry/tracing'
import { startTransaction, configureScope, captureException } from '@sentry/node'

import { Controller} from 'app/core/ports'
import Application from '@ioc:Adonis/Core/Application'
import Logger from '@ioc:Adonis/Core/Logger'

export interface ControllerMetaData {
  operation: string
  description: string
}

export class CaptureErrorDecorator implements Controller<HttpContextContract> {
  constructor (
    private readonly controller: Controller<HttpContextContract>,
    private readonly meta: ControllerMetaData,
    private readonly redirectBack: boolean = true
  ) {}

  public async perform (input: HttpContextContract): Promise<any> {
    const transaction = startTransaction({
      op: this.meta.operation,
      name: this.meta.description,
    })

    configureScope((scope) => {
      scope.setSpan(transaction)
    })

    try {
      return await this.controller.perform(input)
    } catch (e) {
      console.log(e)
      if (Application.inProduction) {
        captureException(e)
      }

      if (Application.inDev) {
        Logger.error(e)
      }

      if (this.redirectBack) {
        input.session
          .flash('alertGlobal', {
            success: false,
            message: input.i18n.formatMessage('shared.errors.internal_server_error'),
          })

        return input.response.redirect().back()
      }

      return input.response.abort({
        message: input.i18n.formatMessage('shared.errors.internal_server_error'),
      }, 500)
    } finally {
      transaction.finish()
    }
  }
}
