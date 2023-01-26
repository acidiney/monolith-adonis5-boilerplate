import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import '@sentry/tracing'
import { startTransaction, configureScope, captureException } from '@sentry/node'

import { Controller} from 'app/core/ports'

export interface ControllerMetaData {
  operation: string
  description: string
}

export class CaptureErrorDecorator implements Controller<HttpContextContract> {
  constructor (
    private readonly controller: Controller<HttpContextContract>,
    private readonly meta: ControllerMetaData
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
      captureException(e)

      input.session
        .flash('errors', {
          message: input.i18n.formatMessage('shared.errors.internal_server_error'),
        })

      return input.response.redirect().back()
    } finally {
      transaction.finish()
    }
  }
}
