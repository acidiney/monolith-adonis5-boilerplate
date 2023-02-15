import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import {ApplicationSettings} from 'app/modules/@shared/framework/infra/db/models'

export default class SetupApplicationSeeder extends BaseSeeder {
  public async run () {
    await ApplicationSettings
      .create({
        appName: 'Monolith Boilerplate',
        appDesc: 'Unified modular application boilerplate',
        appBackgroundPrimaryColor: 'rgb(249, 249, 250)',
        appBackgroundSecondaryColor: 'rgb(245, 245, 246)',
        appColorPrimary: 'rgb(68, 139, 255)',
        appColorSecondary: 'rgb(33, 37, 41)',
      })
  }
}
