import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Controller } from 'app/core/ports'
import { DeleteBulkRolesUseCase } from '../../../domain'
import { DeleteBulkRolesValidator } from '../validations/delete-bulk-roles-validator'

export class DeleteBulkRolesController implements Controller<HttpContextContract> {
  constructor (
    private readonly useCase: DeleteBulkRolesUseCase,
  ) {}

  public async perform ({ i18n, session, request, response }: HttpContextContract): Promise<any> {
    const validation = await request.validate(DeleteBulkRolesValidator)
      .catch(() => {})

    if (!validation) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage('admin.acl.roles.delete.bulk.error.missing.role_list'),
      })

      return response.redirect().back()
    }

    const output = await this.useCase.perform({
      roles: validation.roles,
    })

    if (output.isLeft()) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage(output.value.errorMessage, output.value.errorValue().payload),
      })

      return response.redirect().back()
    }

    session.flash('alert', {
      success: true,
      message: i18n.formatMessage('admin.acl.roles.delete.bulk.success'),
    })

    return response.redirect().back()
  }
}
