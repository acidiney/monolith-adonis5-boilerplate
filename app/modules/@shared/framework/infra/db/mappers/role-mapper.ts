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
      permissions: roleModel.permissions.map((p) => new UniqueEntityID(p.id)),
    }, {
      updatedAt: roleModel.updatedAt.toJSDate(),
      createdAt: roleModel.createdAt.toJSDate(),
    })
  }

  public async toPersistence (roleEntity: RoleEntity): Promise<RoleModel> {
    let roleModel: RoleModel = new RoleModel()
    roleModel.id = roleEntity.id.toString()

    const role = await RoleModel.findBy('id', roleEntity.id.toString())

    if (role) {
      roleModel = role
    }

    roleModel.name = roleEntity.name
    roleModel.description = roleEntity.description
    roleModel.isSystem = false
    roleModel.createdByUser = roleEntity.user?.toString()

    return roleModel
  }
}
