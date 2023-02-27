import {
  ListAllRolesRepository,
} from './props'
import {
  ListRolesDropdownUseCase, ListRolesDropdownUseCaseInput, ListRolesDropdownUseCaseOutput, RoleOptions,
} from 'app/modules/admin/settings/acl/roles-management/domain/usecases/list-roles-dropdown'

export class ListRolesDropdownUseCaseImpl implements ListRolesDropdownUseCase {
  constructor (
    private readonly listAllRolesRepository: ListAllRolesRepository,
  ) {
  }

  public async perform (input: ListRolesDropdownUseCaseInput): Promise<ListRolesDropdownUseCaseOutput> {
    return this.listAllRolesRepository.findAll(input)
      .then((data) => data.filter((r) => r.slug !== 'root').map(r => ({
        name: r.name,
        id: r.id.toString(),
        slug: r.slug,
      }) as RoleOptions))
  }
}
