import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ListAddonsUseCase } from '../../../../domain/usecases/list-addons-usecase'
export class ListAddonsController {
  constructor (
    private readonly listAddonsUseCase: ListAddonsUseCase
  ) {}

  public async index ({ inertia }: HttpContextContract) {
    const addons = await this.listAddonsUseCase.perform()

    return inertia.render(
      'admin/settings/marketplace/framework/views/list-addons',
      {
        addons,
      }
    )
  }
}
