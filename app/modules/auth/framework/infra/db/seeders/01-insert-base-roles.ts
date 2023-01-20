import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class InsertBaseRolesSeed extends BaseSeeder {
  public async run () {
    const roles = [
      {
        name: 'shared.roles.root',
        system: true,
      },
      {
        name: 'shared.roles.sys_admin',
        system: true,
      },
      {
        name: 'shared.roles.moderator',
        system: true,
      },
    ]
  }
}
