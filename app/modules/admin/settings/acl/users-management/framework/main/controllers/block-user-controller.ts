import { Controller } from 'app/core/ports'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { BlockUserUseCase } from '../../../domain'
import { BlockUnblockValidator } from '../validations/block-unblock-validator'

export class BlockUserController implements Controller<HttpContextContract> {
  constructor (
    private readonly blockUserUseCase: BlockUserUseCase
  ) {}

  public async perform ({ request, session, i18n, response }: HttpContextContract): Promise<any> {
    const validation = await request.validate(BlockUnblockValidator)
      .catch((e) => {
        console.log(e.messages)
      })

    if(!validation) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage('admin.acl.users.block_unblock.missing.params'),
      })

      return response.redirect().back()
    }

    const output = await this.blockUserUseCase.perform({
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
      message: i18n.formatMessage('admin.acl.users.blocked'),
    })

    return response.redirect().back()
  }
}
