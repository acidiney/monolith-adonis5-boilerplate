import { InstallAddonViaCommandServiceImpl } from './../../infra/services/install-addon-via-command-service-impl'
import { InstallAddonUseCaseImpl } from './../../../usecases/install-addon/install-addon-use-case-impl'
import { InstallAddonController } from './../controllers/install-addon/install-addon-controller'
import { PersistInstalledAddonRepositoryImpl }
  from '../../infra/db/repositories/persist-installed-addon-repository-impl'

export const makeInstallAddonControllerFactory = (): InstallAddonController => {
  return new InstallAddonController(
    new InstallAddonUseCaseImpl(
      new InstallAddonViaCommandServiceImpl(),
      new PersistInstalledAddonRepositoryImpl()
    )
  )
}
