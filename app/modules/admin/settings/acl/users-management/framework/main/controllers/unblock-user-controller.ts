import { Controller } from 'app/core/ports'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { UnblockUserUseCase } from '../../../domain'
import { BlockUnblockValidator } from '../validations/block-unblock-validator'

export class UnblockUserController implements Controller<HttpContextContract> {
  constructor (
    private readonly unblockUserUseCase: UnblockUserUseCase
  ) {}

  public async perform ({ request, session, i18n, response }: HttpContextContract): Promise<any> {
    const validation = await request.validate(BlockUnblockValidator)
      .catch(() => {})

    if(!validation) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage('admin.acl.users.block_unblock.missing.params'),
      })

      return response.redirect().back()
    }

    const output = await this.unblockUserUseCase.perform({
      username: validation.username,
      motivation: validation.motivation,
    })

    if (output.isLeft()) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage(output.value.errorMessage),
      })

      return response.redirect().back()
    }

    session.flash('alert', {
      success: true,
      message: i18n.formatMessage('admin.acl.users.unblocked'),
    })

    return response.redirect().back()
  }
}
