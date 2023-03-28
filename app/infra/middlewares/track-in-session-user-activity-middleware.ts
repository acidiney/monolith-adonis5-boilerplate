import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {BroadcastMessageContract} from 'app/modules/@shared/domain/ports'
import {BroadcastMessageRepositoryImpl} from 'app/modules/@shared/framework/infra'
import {ActivityProps} from 'app/modules/@shared/framework/infra/inbox-processor'
import {CoreBroadcastEnum} from 'app/modules/@shared/domain/types'

export default class TrackInSessionUserActivityMiddleware {
  constructor (
    private readonly broadcastMessage: BroadcastMessageContract = new BroadcastMessageRepositoryImpl()
  ) {
  }

  public async handle (
    { session, auth, request, response, logger }: HttpContextContract,
    next: () => Promise<void>): Promise<any> {
    logger.info(`${request.method()} ${request.url()} ${request.ip()}`)
    await next()

    let success = true

    if (response.getStatus() === 500) {
      success = false
    }

    const alert = session.get('alert')

    if (alert) {
      success = alert.success

      session.flash('alert', alert)
    }

    const operationName = response.getHeader('x-operation-name')

    await this.broadcastMessage.publish<ActivityProps>('core.shared', {
      type: CoreBroadcastEnum.TRACK_ACTIVITY,
      message: {
        operation: operationName as string,
        ip: request.ip(),
        sessionId: session.sessionId,
        success,
      },
      meta: {
        userId: auth.user?.id ?? null,
      },
    })
  }
}
