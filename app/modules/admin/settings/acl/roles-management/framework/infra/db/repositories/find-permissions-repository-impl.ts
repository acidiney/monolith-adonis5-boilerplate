import {
  FindPermissionsRepository,
} from 'app/modules/admin/settings/acl/roles-management/usecases/find-permissions/ports'
import {PermissionEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/permission-entity'
import {
  PermissionMapper,
} from 'app/modules/admin/settings/acl/roles-management/framework/infra/db/mappers/permission-mapper'
import {PermissionModel} from 'app/modules/@shared/framework/infra/db/models'

export class FindPermissionsRepositoryImpl implements FindPermissionsRepository {
  constructor (
    private readonly permissionMapper: PermissionMapper
  ) {
  }

  public async findAll (isRoot: boolean): Promise<PermissionEntity[]> {
    const permissions = await PermissionModel
      .query()
      .where((q) => {
        if (!isRoot) {
          q.whereNot('internal', true)
        }
      })
      .exec()

    return permissions.map(this.permissionMapper.toDomain)
  }
}
