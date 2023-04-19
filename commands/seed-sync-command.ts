import Application from '@ioc:Adonis/Core/Application'
import { BaseCommand } from '@adonisjs/core/build/standalone'
import * as lodash from 'lodash'
import { resolve } from 'path'
import * as process from 'process'

export default class SeedSyncCommand extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'db:sync'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Syncronize seeds in database'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process
     */
    stayAlive: false,
  }

  public async run () {
    const { loadContext, execCommand } = await import('../app/infra/utils')
    const { CoreDbSyncModel } = await import('app/modules/@shared/framework/infra/db/models')

    const executedSeeds = await (await CoreDbSyncModel.all()).map((seed) => seed.seedName)
    let difference: string[]

    const taskManager = this.ui.tasks()

    await taskManager
      .add('Comparing seeds', async (_, task) => {
        try {
          const modulesSeeders = await loadContext(resolve(Application.appRoot, './app/modules'),
            true, /infra\/db\/seeders\/.*\.(ts|js)$/)

          const seedNames =
          modulesSeeders.keys()
            .map((k) => {
              return k.replace(Application.appRoot, '.')
            })

          difference = lodash.difference(seedNames, executedSeeds)

          if (difference.length) {
            await task.complete('Foram encontradas as diferenças')
          } else {
            await task.complete('Não foram encontradas diferenças')
          }
        } catch (e) {
          _.error(e)
          await task.fail(new Error('Não foi possível comparar as seeds'))
        }
      })
      .add('Run difference seeds', async (_, task) => {
        if (!difference.length) {
          await task.complete('Skipped')
          return
        }

        let currentSeed: string = ''
        try {
          for (const seedName of difference) {
            currentSeed = seedName

            process.env.NODE_ENV = 'seeding'

            await execCommand('node', [
              'ace',
              'db:seed',
              `--files=${seedName}`,
            ])
              .then(async () => {
                await CoreDbSyncModel.create({
                  seedName,
                })
              })
              .catch((e) => {
                console.log(e)
              })
          }
        } catch (e) {
          console.log(e)
          _.error(e)
          await CoreDbSyncModel.query()
            .where({
              seedName: currentSeed,
            })
            .delete()
          await task.fail(new Error('Não foi possível realizar seed de ' + currentSeed))
        }
      })
      .run()
  }
}
