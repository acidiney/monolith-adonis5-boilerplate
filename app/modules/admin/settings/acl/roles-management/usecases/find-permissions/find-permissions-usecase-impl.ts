import {FindPermissionsUseCase, FindPermissionUseCaseOutput}
  from 'app/modules/admin/settings/acl/roles-management/domain'
import {
  FindPermissionsRepository,
} from './ports'

export class FindPermissionsUseCaseImpl implements FindPermissionsUseCase {
  constructor (
    private readonly findPermissionsRepository: FindPermissionsRepository
  ) {
  }
  public async perform ({ isRoot }: { isRoot: boolean }): Promise<FindPermissionUseCaseOutput[]> {
    const permissions = await this.findPermissionsRepository.findAll(isRoot)
    const groups: string[] = permissions.map(p => p.group)

    const distinctGroup = new Set(...groups)

    const permissionGroup: FindPermissionUseCaseOutput[] = []

    for (const group of distinctGroup) {
      permissionGroup.push({
        id: group,
        children: permissions.filter(p => p.group === group).map(p => ({
          description: p.description,
          id: p.id.toString(),
          display: p.name,
        })),
      })
    }

    return permissionGroup
  }
}
