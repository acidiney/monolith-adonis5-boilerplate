import { InstallAddonController } from './../../framework/main/controllers/install-addon/install-addon-controller'
import { UniqueEntityID } from 'app/core/domain'
import { InstallAddonUseCase } from './../../domain/usecases/install-addon-usecase'
import { InstallAddonViaCommandService, PersistInstalledAddonRepository } from './ports'
export class InstallAddonUseCaseImpl implements InstallAddonUseCase {
  constructor (
    private readonly installAddonViaCommandService: InstallAddonViaCommandService,
    private readonly persistInstalledAddonRepository: PersistInstalledAddonRepository
  ) {}

  public async perform (input: { addonName: string; version: number, currentUserId: UniqueEntityID; }): Promise<void> {
    await this.installAddonViaCommandService.handle(input.addonName)
    await this.persistInstalledAddonRepository.persist(input.addonName, input.version, input.currentUserId)
  }
}
