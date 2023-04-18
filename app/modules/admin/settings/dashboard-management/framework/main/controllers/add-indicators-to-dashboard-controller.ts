import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Controller } from 'app/core/ports'
import { AddIndicatorsToDashboardValidator } from '../validators/add-indicators-to-dashboard-validator'
import { AddIndicatorsToDashboardUseCase, IndicatorSize } from '../../../domain'
import { UniqueEntityID } from 'app/core/domain'

export class AddIndicatorsToDashboardController implements Controller<HttpContextContract> {
  constructor (
    private readonly addIndicatorsToDashboardUseCase: AddIndicatorsToDashboardUseCase
  ) {}

  public async perform ({ params, request, response, session, i18n }: HttpContextContract): Promise<any> {
    const { dashboardId } = params

    const validation = await request.validate(AddIndicatorsToDashboardValidator)
      .catch(e => {
        // TODO: put error in session
      })

    if (!validation) {
      return response.redirect().back()
    }

    const output = await this.addIndicatorsToDashboardUseCase.perform({
      dashboardId: new UniqueEntityID(dashboardId),
      indicators: validation.indicators.map((i) => ({
        id: new UniqueEntityID(i.id),
        size: i.size as IndicatorSize,
        order: i.order,
        label: i.label,
        description: i.description,
      })),
    })

    if (output.isLeft()) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage(output.value.errorMessage),
      })

      return response.redirect().back()
    }

    session.flash('alert', {
      success: true,
      message: i18n.formatMessage('admin.settings.dashboard-managment.new-indicators-associated'),
    })

    return response.redirect().back()
  }
}
