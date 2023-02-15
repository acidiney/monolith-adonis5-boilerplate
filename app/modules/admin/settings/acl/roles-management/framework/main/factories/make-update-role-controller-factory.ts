import { EventDispatcher } from 'app/core/domain'
import { TransactionAdapterImpl } from 'app/infra/db/adapters/transaction-adapter-impl'
import { RoleMapper } from 'app/modules/@shared/framework/infra/db/mappers'
import { UpdateRoleUseCaseImpl } from '../../../usecases'
import { FindRoleBySlugRepositoryImpl, UpdateRoleWithTransactionRepositoryImpl } from '../../infra'
import { UpdateRoleController } from '../controllers/update-role-controller'

export const makeUpdateRoleControllerFactory = (): UpdateRoleController => {
  return new UpdateRoleController(
    new UpdateRoleUseCaseImpl(
      new FindRoleBySlugRepositoryImpl(new RoleMapper()),
      new UpdateRoleWithTransactionRepositoryImpl(new RoleMapper()),
      new TransactionAdapterImpl(),
      EventDispatcher.getInstance()
    )
  )
}
