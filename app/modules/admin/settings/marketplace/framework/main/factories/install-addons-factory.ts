import { InstallAddonController } from './../controllers/install-addon/install-addon-controller'
import { InstallAddonUseCaseImpl } from './../../../usecases/install-addon/install-addon-use-case-impl'
import { PersistInstalledAddonRepositoryImpl }
  from '../../infra/db/repositories/persist-installed-addon-repository-impl'
import { InstallAddonViaCommandServiceImpl } from './../../infra/services/install-addon-via-command-service-impl'

export const makeInstallAddonControllerFactory = (): InstallAddonController => {
  return new InstallAddonController(
    new InstallAddonUseCaseImpl(
      new InstallAddonViaCommandServiceImpl(),
      new PersistInstalledAddonRepositoryImpl()
    )
  )
}
