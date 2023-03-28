import {Controller} from 'app/core/ports'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {RetrieveNewestActivitiesUseCase} from 'app/modules/admin/common/domain'

export class RetrieveUserActivitiesController implements Controller<HttpContextContract> {
  constructor (
    private readonly retrieveUserActivitiesUseCase: RetrieveNewestActivitiesUseCase
  ) {
  }

  public async perform ({ params, response }: HttpContextContract): Promise<any> {
    const output = await this.retrieveUserActivitiesUseCase.perform({
      userId: params.userId,
    })

    if (output.isLeft()) {
      return response.badRequest(output.value)
    }

    return response.ok(output.value)
  }
}
