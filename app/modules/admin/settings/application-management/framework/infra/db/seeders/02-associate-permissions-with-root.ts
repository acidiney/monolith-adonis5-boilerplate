import execa from 'execa'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class AssociatePermissionsWithRote extends BaseSeeder {
  public async run () {
    await execa.node('ace', ['db:seed', '--files', './database/seeders/05-associate-permissions-to-root.ts'])
  }
}
