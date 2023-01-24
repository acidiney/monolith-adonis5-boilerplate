import { args, BaseCommand } from '@adonisjs/core/build/standalone'
import { resolve } from 'path'
import util from 'util'

const exec = util.promisify(require('child_process').exec)

export default class UpdateAddon extends BaseCommand {
  public static commandName = 'addon:update'

  public static description = 'Update a package'

  public static settings = {
    loadApp: true,
    stayAlive: false,
  }

  @args.string({ description: 'package-name' })
  public packageName: string

  public async run () {
    const baseUrl = this.application.appRoot
    const modulePath = resolve(baseUrl, 'app/modules/addons', this.packageName)

    const taskManager = this.ui.tasks()

    await taskManager
      .add(`Pulling package ${this.packageName}`, async (_, task) => {
        await exec(`cd ${modulePath} && git pull origin HEAD`)
          .then(async () => {
            await task.complete('Package pulled!')
          })
          .catch(async () => {
            await task.fail('Error while pull!')
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
