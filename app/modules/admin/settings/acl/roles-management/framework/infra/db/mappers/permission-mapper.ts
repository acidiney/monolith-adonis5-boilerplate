import {Mapper, UniqueEntityID} from 'app/core/domain'
import {PermissionEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/permission-entity'
import {CorePermissionModel} from 'app/modules/@shared/framework/infra/db/models'

export class PermissionMapper implements Mapper<PermissionEntity, CorePermissionModel> {
  public toDomain (permissionModel: CorePermissionModel): PermissionEntity {
    return PermissionEntity.hydrate(
      new UniqueEntityID(permissionModel.id),
      {
        group: permissionModel.group,
        name: permissionModel.display,
        description: permissionModel.description,
      }
    )
  }
  public toPersistence (_permissionEntity: PermissionEntity): Promise<CorePermissionModel> | CorePermissionModel {
    throw new Error('toPersistence not implemented on PermissionMapper')
  }
}
