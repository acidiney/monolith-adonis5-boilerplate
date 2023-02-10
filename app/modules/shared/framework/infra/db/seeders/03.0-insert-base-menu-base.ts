import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { MenuModel } from 'app/modules/shared/framework/infra/db/models/menu-model'

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
      // {
      //   display: 'menu.templates',
      //   slug: 'templates',
      //   url: '',
      //   icon: '',
      //   order: 2,
      //   isGroup: true,
      // },
      // {
      //   display: 'menu.groups',
      //   slug: 'groups',
      //   url: '',
      //   icon: '',
      //   order: 3,
      //   isGroup: true,
      // },
      // {
      //   display: 'menu.organisms',
      //   slug: 'organisms',
      //   url: '',
      //   icon: '',
      //   order: 4,
      //   isGroup: true,
      // },
      // {
      //   display: 'menu.activities',
      //   slug: 'activities',
      //   url: '',
      //   icon: '',
      //   order: 5,
      //   isGroup: true,
      // },
      {
        display: 'menu.settings',
        slug: 'group_settings',
        url: '',
        icon: '',
        order: 2,
        isGroup: true,
      },
    ]

    await MenuModel.createMany(menus)
  }
}
