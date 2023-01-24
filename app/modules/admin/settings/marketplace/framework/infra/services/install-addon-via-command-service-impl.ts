import execa from 'execa'
import { InstallAddonViaCommandService } from '../../../usecases/install-addon/ports'

export class InstallAddonViaCommandServiceImpl implements InstallAddonViaCommandService {
  public async handle (addonName: string): Promise<void> {
    await execa.node('ace', ['addon:install', addonName], {
      stdout: 'inherit',
    })
  }
}
