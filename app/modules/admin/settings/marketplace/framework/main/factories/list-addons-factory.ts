import { RetrieveAddonsServiceImpl } from './../../infra/services/retrieve-addons-service-impl'
import { ListAddonsUseCaseImpl } from '../../../usecases/list-addons/list-addons-use-case-impl'
import { ListAddonsController } from '../controllers/list-addons/list-addons-controller'

export const makeListAddonsControllerFactory = (): ListAddonsController => {
  return new ListAddonsController(
    new ListAddonsUseCaseImpl(
      new RetrieveAddonsServiceImpl()
    )
  )
}
