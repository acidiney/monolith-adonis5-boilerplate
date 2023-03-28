import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { CaptureErrorDecorator, ControllerMetaData } from 'app/infra/decorators'
import { Controller } from '../ports'

export const routeAdapter = (
  controller: Controller<HttpContextContract>,
  meta: ControllerMetaData,
  redirectBack: boolean = true
) => {
  return async (ctx: HttpContextContract) =>
    new CaptureErrorDecorator(controller, meta, redirectBack).perform(ctx)
}

