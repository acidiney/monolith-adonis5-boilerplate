import {Controller} from 'app/core/ports'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {FindPermissionsUseCase} from 'app/modules/admin/settings/acl/roles-management/domain'

export class CreateRoleViewController implements Controller<HttpContextContract> {
  constructor (
    private readonly findPermissionsUseCase: FindPermissionsUseCase
  ) {
  }

  public async perform ({ auth, inertia }: HttpContextContract): Promise<any> {
    await auth.user?.load('role')

    const isRoot = auth.user?.role.isRoot ?? false

    const permissions = await this.findPermissionsUseCase.perform({
      isRoot,
    })

    return inertia.render('admin/settings/acl/roles-management/framework/views/create-role', {
      permissions,
    })
  }
}
