/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {Mapper, UniqueEntityID} from 'app/core/domain'
import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
import {RoleModel} from 'app/modules/@shared/framework/infra/db/models'

export class RoleMapper implements Mapper<RoleEntity, RoleModel> {
  public toDomain (roleModel: RoleModel): RoleEntity {
    return RoleEntity.hydrate(new UniqueEntityID(roleModel.id), {
      name: roleModel.name,
      slug: roleModel.slug,
      description: roleModel.description,
      internal: Boolean(roleModel.isSystem),
    }, {
      updatedAt: roleModel.updatedAt.toJSDate(),
      createdAt: roleModel.createdAt.toJSDate(),
    })
  }

  public toPersistence (_data: RoleEntity): Promise<RoleModel> | RoleModel {
    throw new Error('need implementation')
  }
}
