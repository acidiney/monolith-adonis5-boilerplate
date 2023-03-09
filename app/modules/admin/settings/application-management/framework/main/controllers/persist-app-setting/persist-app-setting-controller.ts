import { Controller } from 'app/core/ports'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { PersistAppSettindValidator } from '../../validators/persist-app-setting-validator'
import { PersistAppSettingUseCase } from '../../../../domain/usecases/persist-app-setting/persist-app-setting-usecase'

export class PersistAppSettingController implements Controller<HttpContextContract>{
  constructor (
    private readonly persistAppSettingUseCase: PersistAppSettingUseCase
  ) { }
  public async perform ({ auth, session, request, i18n, response }: HttpContextContract): Promise<any>{
    if (!auth.user) {
      return response.redirect().back()
    }
    const validations= await request.validate(PersistAppSettindValidator).catch(() => {})

    if (!validations) {
      session.flash('alert', {
        sucess: false,
        message: i18n.formatMessage('admin.settings.app.error'),
      })
      return response.redirect().back()
    }

    const output = await this.persistAppSettingUseCase.perform({
      appName: validations.appName,
      appDesc: validations.appDesc,
      appColorPrimary: validations.appColorPrimary,
      appColorSecundary: validations.appColorSecundary,
      appBackgroundPrimaryColor: validations.appBackgroundPrimaryColor,
      appBackgroundSecundaryColor:validations.appBackgroundSecundaryColor,
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
      message: i18n.formatMessage('admin.settings.app.sucess'),
    })

    return response.redirect().back()
  }
}

