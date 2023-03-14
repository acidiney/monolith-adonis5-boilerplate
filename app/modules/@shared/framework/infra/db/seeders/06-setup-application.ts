import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import {CoreApplicationSettings} from 'app/modules/@shared/framework/infra/db/models'

export default class SetupApplicationSeeder extends BaseSeeder {
  public async run () {
    await CoreApplicationSettings
      .create({
        appName: 'Monolith Boilerplate',
        appDesc: 'Unified modular application boilerplate',
        appBackgroundPrimaryColor: '#f9f9fa',
        appBackgroundSecondaryColor: '#f5f5f6',
        appColorPrimary: '#448bff',
        appColorSecondary: '#212529',
      })
  }
}
