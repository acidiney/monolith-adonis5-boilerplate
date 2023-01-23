import execa from 'execa'
import { resolve } from 'path'
import { getDirectories as context } from '../app/infra/utils/context'
import { BaseCommand } from '@adonisjs/core/build/standalone'

export default class InstallAddonDependencies extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'addon:install:deps'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Install all packages deps'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run () {
    const modules = context(resolve(__dirname, '../app/modules/addons'))
      .map((s) => `./app${s.split('app')[1]}`)

    for (const mod of modules) {
      await execa('npm', ['install', mod, '--no-save'])
    }
  }
}
