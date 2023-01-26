import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {Controller} from 'app/core/ports'
import { ListAddonsUseCase } from '../../../../domain/usecases/list-addons-usecase'

export class ListAddonsController implements Controller<HttpContextContract>{
  constructor (
    private readonly listAddonsUseCase: ListAddonsUseCase
  ) {}

  public async perform ({ inertia }: HttpContextContract) {
    const addons = await this.listAddonsUseCase.perform()

    return inertia.render(
      'admin/settings/marketplace/framework/views/list-addons',
      {
        addons,
      }
    )
  }
}
