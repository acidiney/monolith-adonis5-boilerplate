import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CoreMenuModel } from 'app/modules/@shared/framework/infra/db/models/core-menu-model'

export default class MenuSeedSeeder extends BaseSeeder {
  public async run () {
    const menus = [
      {
        display: 'menu.main',
        slug: 'group_main',
        url: '',
        icon: '',
        order: 1,
        isGroup: true,
      },
      {
        display: 'menu.settings',
        slug: 'group_settings',
        url: '',
        icon: '',
        order: 2,
        isGroup: true,
      },
    ]

    await CoreMenuModel.createMany(menus)
  }
}
