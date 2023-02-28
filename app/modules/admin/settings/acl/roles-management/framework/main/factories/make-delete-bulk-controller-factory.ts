import { EventDispatcher } from 'app/core/domain'
import { TransactionAdapterImpl } from 'app/infra/db/adapters/transaction-adapter-impl'
import {
  RoleMapper,
  UserMapper,
} from 'app/modules/@shared/framework/infra/db/mappers'
import { DeleteBulkRolesUseCaseImpl } from '../../../usecases'
import {
  DeleteBulkRolesWithTransactionRespositoryImpl,
  FindAssociatedUsersToRoleRepositoryImpl,
  FindRoleBySlugRepositoryImpl,
} from '../../infra'
import { DeleteBulkRolesController } from '../controllers/delete-bulk-roles-controller'

export const makeDeleteBulkControllerFactory =
  (): DeleteBulkRolesController => {
    return new DeleteBulkRolesController(
      new DeleteBulkRolesUseCaseImpl(
        new TransactionAdapterImpl(),
        new FindAssociatedUsersToRoleRepositoryImpl(new UserMapper()),
        new FindRoleBySlugRepositoryImpl(new RoleMapper()),
        new DeleteBulkRolesWithTransactionRespositoryImpl(),
        EventDispatcher.getInstance()
      )
    )
  }
