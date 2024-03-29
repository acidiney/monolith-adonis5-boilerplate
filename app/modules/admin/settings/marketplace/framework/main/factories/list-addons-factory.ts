import Env from '@ioc:Adonis/Core/Env'
import { AddonServiceImpl } from 'app/modules/@shared/framework/infra/services/addon-service-impl'
import { HttpClientAdapterImpl } from 'app/modules/@shared/framework/infra/adapters/http-client-adapter-impl'

import { ListAddonsController } from '../controllers/list-addons/list-addons-controller'
import { ListAddonsUseCaseImpl } from '../../../usecases/list-addons/list-addons-use-case-impl'
import { RetrieveAddonsServiceImpl } from './../../infra/services/retrieve-addons-service-impl'
import { CompareAddonsRepositoryImpl } from './../../infra/db/repositories/compare-addons-repository-impl'

export const makeListAddonsControllerFactory = (): ListAddonsController => {
  return new ListAddonsController(
    new ListAddonsUseCaseImpl(
      new RetrieveAddonsServiceImpl(
        new AddonServiceImpl(
          new HttpClientAdapterImpl(Env.get('GITLAB_URL'))
        )
      ),
      new CompareAddonsRepositoryImpl()
    )
  )
}
