import { resolve } from 'path'
import { args, BaseCommand } from '@adonisjs/core/build/standalone'
import util from 'util'

const exec = util.promisify(require('child_process').exec)

export default class InstallAddon extends BaseCommand {
  public static commandName = 'addon:install'

  public static description = 'Install a addon'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  @args.string({ description: 'package-name' })
  public packageName: string

  public async run () {
    const { default: Env } = await import('@ioc:Adonis/Core/Env')

    const baseUrl = this.application.appRoot
    const modulePath = resolve(baseUrl, 'app/modules/addons', this.packageName)

    const packageUrl = `${Env.get('BASE_PACKAGE_URL')}/${this.packageName}`
    const taskManager = this.ui.tasks()

    await taskManager
      .add(`Clonnig package ${this.packageName}`, async (_, task) => {
        await exec(`git clone ${packageUrl} ${modulePath}`)
          .then(async () => {
            await task.complete('Package cloned!')
          })
          .catch(async () => {
            await task.fail('Error while clonning!')
          })
      })
      .add('Install dependencies', async (_, task) => {
        await this.kernel.exec('addon:install:deps', [])
          .then(async () => {
            await task.complete('All packages installed!')
          })
          .catch(async () => {
            await task.fail('Please install packages manually!')
          })
      })
      .add('Install Migrations', async (_, task) => {
        await exec('node ace migration:run')
          .then(async () => {
            await task.complete('All migrations installed!')
          })
          .catch(async () => {
            await task.fail('Please install migrations manually!')
          })
      })
      .add('Install Seeders', async (_, task) => {
        await this.kernel.exec('db:sync', [])
          .then(async () => {
            await task.complete('All Seeders installed!')
          })
          .catch(async () => {
            await task.fail('Please install seeders manually!')
          })
      })
      .run()

    this.logger.success('Please restart application')
  }
}
