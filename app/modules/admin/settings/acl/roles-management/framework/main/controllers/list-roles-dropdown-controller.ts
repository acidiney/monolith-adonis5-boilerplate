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

  public async perform ({ response }: HttpContextContract): Promise<any> {
    const output = await this.listRolesDropdownUseCase.perform()

    return response.ok(output)
  }
}
