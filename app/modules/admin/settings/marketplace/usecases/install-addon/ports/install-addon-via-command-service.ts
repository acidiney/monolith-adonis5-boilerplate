export interface InstallAddonViaCommandService {

  handle (addonName: string): Promise<void>

}
