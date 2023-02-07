import {Controller} from 'app/core/ports'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {ListUsersUseCase} from 'app/modules/admin/settings/acl/users-management/domain'

export class ListUsersController implements Controller<HttpContextContract> {
  constructor (
    private readonly listUsersUseCase: ListUsersUseCase
  ) {
  }

  public async perform ({ inertia, request }: HttpContextContract): Promise<any> {
    const page = request.input('page')
    const perPage = request.input('perPage')

    const output = await this.listUsersUseCase.perform({
      page: page ?? 1,
      perPage: perPage ?? 10,
    })

    return inertia.render('admin/settings/acl/users-management/framework/views/list-users', {
      content: output,
    })
  }
}
