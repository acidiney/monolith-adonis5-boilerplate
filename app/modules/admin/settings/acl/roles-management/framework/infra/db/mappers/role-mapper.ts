/*
 * Copyright (c) 2023.
 * ITGest Angola
 */

import {Mapper, UniqueEntityID} from 'app/core/domain'
import {RoleEntity} from 'app/modules/admin/settings/acl/roles-management/domain/entities/role-entity'
import {RoleModel} from 'app/infra/models'

export class RoleMapper implements Mapper<RoleEntity, RoleModel> {
  public toDomain (data: RoleModel): RoleEntity {
    return RoleEntity.hydrate(new UniqueEntityID(data.id), {
      name: data.name,
      slug: data.slug,
      internal: Boolean(data.isSystem),
    }, {
      updatedAt: data.updatedAt.toJSDate(),
      createdAt: data.createdAt.toJSDate(),
    })
  }

  public toPersistence (_data: RoleEntity): Promise<RoleModel> | RoleModel {
    throw new Error('need implementation')
  }
}
