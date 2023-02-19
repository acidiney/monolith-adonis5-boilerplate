import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { Controller } from 'app/core/ports'
import { UploadService } from './ports'
import { UpdateUserInfoUseCase } from 'app/modules/admin/common/domain'
import { UpdateUserInfoValidator } from '../../validators/update-user-info-validator'

export class UpdateUserInfoController implements Controller<HttpContextContract> {
  constructor (
    private readonly uploadAvatarService: UploadService,
    private readonly updateUserInfoUseCase: UpdateUserInfoUseCase
  ) {}

  public async perform ({ auth, request, session, i18n, response }: HttpContextContract): Promise<any> {
    if (!auth.user) {
      return response.redirect().back()
    }

    const validation = await request.validate(UpdateUserInfoValidator)
      .catch((e) => {
        session.flash('alert', {
          success: false,
          message: e.messages,
        })
      })

    if (!validation) {
      return response.redirect().back()
    }

    const avatar = request.file('avatar', {
      size: '2mb',
      extnames: ['jpg', 'png'],
    })

    const userId = auth.user.id

    let avatarUrl: string | undefined

    if (avatar) {
      avatarUrl = await this.uploadAvatarService.upload(avatar, auth.user.slug, `profile.${avatar.extname}`)
    }

    const output = await this.updateUserInfoUseCase.perform({
      userId,
      avatarUrl: avatarUrl,
      firstName: validation.firstName,
      lastName: validation.lastName,
    })

    if (output.isLeft()) {
      session.flash('alert', {
        success: false,
        message: i18n.formatMessage(output.value.errorMessage),
      })
    }

    session.flash('alert', {
      success: true,
      message: i18n.formatMessage('common.user.info.updated'),
    })

    return response.redirect().back()
  }
}
