import {Controller} from 'app/core/ports'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {
  ListRolesDropdownUseCase,
} from 'app/modules/admin/settings/acl/roles-management/domain/usecases/list-roles-dropdown'

export class ListRolesDropdownControllerController implements Controller<HttpContextContract> {
  constructor (
    private readonly listRolesDropdownUseCase: ListRolesDropdownUseCase
  ) {
  }

  public async perform ({ auth, response }: HttpContextContract): Promise<any> {
    await auth.user?.load('role')
    const output = await this.listRolesDropdownUseCase.perform({
      isRoot: auth.user?.role.slug === 'root',
    })

    return response.ok(output)
  }
}
