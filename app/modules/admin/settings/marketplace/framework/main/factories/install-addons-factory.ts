import { InstallAddonController } from './../controllers/install-addon/install-addon-controller'

export const makeInstallAddonControllerFactory = (): InstallAddonController => {
  return new InstallAddonController(
  )
}
