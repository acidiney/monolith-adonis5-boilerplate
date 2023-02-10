import execa from 'execa'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class AssociatePermissionsWithRote extends BaseSeeder {
  public async run () {
    await execa.node('ace', ['db:seed', '--files',
      './app/modules/@shared/framework/infra/db/seeders/05-associate-permissions-to-root.ts'])
  }
}
