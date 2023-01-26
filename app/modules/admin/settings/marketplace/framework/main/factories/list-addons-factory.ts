import { AddonServiceImpl } from 'app/infra/services/addon-service-impl'
import { HttpClientAdapterImpl } from 'app/infra/adapters/http-client-adapter-impl'

import { ListAddonsController } from '../controllers/list-addons/list-addons-controller'
import { ListAddonsUseCaseImpl } from '../../../usecases/list-addons/list-addons-use-case-impl'
import { RetrieveAddonsServiceImpl } from './../../infra/services/retrieve-addons-service-impl'
import { CompareAddonsRepositoryImpl } from './../../infra/db/repositories/compare-addons-repository-impl'

export const makeListAddonsControllerFactory = (): ListAddonsController => {
  return new ListAddonsController(
    new ListAddonsUseCaseImpl(
      new RetrieveAddonsServiceImpl(
        new AddonServiceImpl(
          new HttpClientAdapterImpl()
        )
      ),
      new CompareAddonsRepositoryImpl()
    )
  )
}
