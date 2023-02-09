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

  public async perform ({ inertia, request }: HttpContextContract): Promise<any> {
    const page = request.input('page')
    const perPage = request.input('perPage')

    const output = await this.listRolesUseCase.perform({
      page: page ?? 1,
      perPage: perPage ?? 10,
    })

    return inertia.render('admin/settings/acl/roles-management/framework/views/list-roles', {
      content: output,
    })
  }
}