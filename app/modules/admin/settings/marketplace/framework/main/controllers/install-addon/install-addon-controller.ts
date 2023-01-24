import execa from 'execa'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export class InstallAddonController {
  public async index ({ request, inertia }: HttpContextContract) {
    const { addonName } = request.all()

    await execa.node('ace', ['addon:install', addonName], {
      stdout: 'inherit',
    })

    return inertia.render(
      'admin/settings/marketplace/framework/views/list-addons',
      {
        name: addonName,
      }
    )
  }
}
