import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import execa from 'execa'

export default class InsertPermissionIntoRootRole extends BaseSeeder {
  public async run (): Promise<void> {
    await execa.node('ace', [
      'db:seed',
      '--files',
      './app/modules/@shared/framework/infra/db/seeders/05-associate-permissions-to-root',
    ])
  }
}
