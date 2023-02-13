import {Controller} from 'app/core/ports'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {
  ListRolesUseCase,
} from 'app/modules/admin/settings/acl/roles-management/domain/usecases/list-roles/list-roles-usecase'

export class ListRolesController implements Controller<HttpContextContract> {
  constructor (
    private readonly listRolesUseCase: ListRolesUseCase
  ) {
  }

  public async perform ({ auth, inertia, request }: HttpContextContract): Promise<any> {
    const page = request.input('page')
    const perPage = request.input('perPage')

    await auth.user?.load('role')

    const output = await this.listRolesUseCase.perform({
      page: page ?? 1,
      perPage: perPage ?? 10,
      isRoot: auth.user?.role.isRoot ?? false,
    })

    return inertia.render('admin/settings/acl/roles-management/framework/views/list-roles', {
      content: output,
    })
  }
}
