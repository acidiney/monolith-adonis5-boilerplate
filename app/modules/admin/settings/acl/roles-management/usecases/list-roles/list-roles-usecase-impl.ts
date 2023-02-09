import {
  ListRolesRepository,
} from './props'
import {DateAdapter} from 'app/domain/ports'
import {
  ListRolesUseCaseInput,
  ListRolesUseCaseOutput,
  Role,
} from 'app/modules/admin/settings/acl/roles-management/domain'
import {
  ListRolesUseCase,
} from 'app/modules/admin/settings/acl/roles-management/domain/usecases/list-roles/list-roles-usecase'

export class ListRolesUseCaseImpl implements ListRolesUseCase {
  constructor (
    private readonly listRolesRepository: ListRolesRepository,
    private readonly dateAdapter: DateAdapter
  ) {
  }

  public async perform (input: ListRolesUseCaseInput): Promise<ListRolesUseCaseOutput> {
    return this.listRolesRepository.findAll(input)
      .then((pagination) => ({
        ...pagination,
        data: pagination.data?.map(r => ({
          updatedAt: r.updatedAt,
          updatedAtText: this.dateAdapter.format(r.updatedAt),
          name: r.name,
          slug: r.slug,
          isInternal: r.isInternal,
        }) as Role),
      }))
  }
}
