import { CompareAddonsRepository, RetrieveAddonsService } from './ports'
import { Addon } from '../../domain/entities/addon'
import { ListAddonsUseCase } from '../../domain/usecases/list-addons-usecase'

export class ListAddonsUseCaseImpl implements ListAddonsUseCase {
  constructor (
    private readonly retrieveAddonsService: RetrieveAddonsService,
    private readonly compareAddonsRepository: CompareAddonsRepository
  ) {}

  public async perform (): Promise<Addon[]> {
    return this.retrieveAddonsService.retrieveAll()
      .then(this.compareAddonsRepository.compare)
  }
}
