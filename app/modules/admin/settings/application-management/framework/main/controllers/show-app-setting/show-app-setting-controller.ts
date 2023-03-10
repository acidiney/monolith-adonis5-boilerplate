import { Controller } from 'app/core/ports'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { FindAppSettingUseCase } from '../../../../domain/usecases/find-app-setting/find-app-setting-usecase'

export class ShowAppSettingPageController implements Controller < HttpContextContract > {
  constructor (private readonly findAppSettingUseCase:FindAppSettingUseCase){}
  public async perform ({ auth, inertia, response}: HttpContextContract): Promise<any>{
    if (!auth.user) {
      return response.redirect().back()
    }

    const appSetting = await this.findAppSettingUseCase.perform()

    return inertia.render('admin/settings/application-management/framework/views/AppSettings', {...appSetting})
  }
}
