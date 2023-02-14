import {Controller} from 'app/core/ports'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import {
  ListRolesUseCase,
} from 'app/modules/admin/settings/acl/roles-management/domain/usecases/list-roles/list-roles-usecase'
import {ListRolesUseCaseInput} from 'app/modules/admin/settings/acl/roles-management/domain'

export class ListRolesController implements Controller<HttpContextContract> {
  constructor (
    private readonly listRolesUseCase: ListRolesUseCase
  ) {
  }

  public async perform ({ auth, inertia, request }: HttpContextContract): Promise<any> {
    const page = request.input('page') ?? 1
    const perPage = request.input('perPage') ?? 10
    const searchBy = request.input('searchBy')
    const search = request.input('search')
    const orderBy = request.input('orderBy')
    const order = request.input('orderBy')

    await auth.user?.load('role')

    const input: ListRolesUseCaseInput = {
      page: Number(page),
      perPage: Number(perPage),
      isRoot: auth.user?.role.isRoot ?? false,
      searchBy: searchBy ?? 'name',
      searchValue: search,
      orderBy: orderBy ?? 'updated_at',
      orderByDirection: order ?? 'desc',
    }

    const output = await this.listRolesUseCase.perform(input)

    return inertia.render('admin/settings/acl/roles-management/framework/views/list-roles', {
      content: output,
      query: {
        page: input.page,
        perPage: input.perPage,
      },
    })
  }
}
