import {
  ListAllRolesRepository,
} from './props'
import {
  ListRolesDropdownUseCase, ListRolesDropdownUseCaseOutput, RoleOptions,
} from 'app/modules/admin/settings/acl/roles-management/domain/usecases/list-roles-dropdown'

export class ListRolesDropdownUseCaseImpl implements ListRolesDropdownUseCase {
  constructor (
    private readonly listAllRolesRepository: ListAllRolesRepository,
  ) {
  }

  public async perform (): Promise<ListRolesDropdownUseCaseOutput> {
    return this.listAllRolesRepository.findAll()
      .then((data) => data.map(r => ({
        name: r.name,
        id: r.id.toString(),
      }) as RoleOptions))
  }
}
