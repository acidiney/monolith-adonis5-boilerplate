import '@sentry/tracing'
import { startTransaction, configureScope, captureException } from '@sentry/node'

import { internalServerError } from '@core/hooks'
import { Controller, Input, Output } from '@core/ports'

import { Env } from 'config/env'

export interface ControllerMetaData {
  operation: string
  description: string
}

export class CaptureErrorDecorator<T, O> implements Controller<T, O> {
  constructor(
    private readonly controller: Controller<T, O>,
    private readonly meta: ControllerMetaData
  ) {}

  async perform(input: Input<T>): Promise<Output<O>> {
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
      if (Env.isProd) {
        captureException(e)
      } else {
        console.log(e)
      }
      return internalServerError()
    } finally {
      transaction.finish()
    }
  }
}
