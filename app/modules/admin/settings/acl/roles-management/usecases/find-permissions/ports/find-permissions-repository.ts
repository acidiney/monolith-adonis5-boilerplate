import {PermissionEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/permission-entity'

export interface FindPermissionsRepository {
  findAll (isRoot: boolean): Promise<PermissionEntity[]>
}
