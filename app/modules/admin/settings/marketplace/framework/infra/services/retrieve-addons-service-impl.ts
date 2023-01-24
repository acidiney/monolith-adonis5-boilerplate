import { Addon } from '../../../domain/entities/addon'
import { RetrieveAddonsService } from '../../../usecases/list-addons/ports'

export class RetrieveAddonsServiceImpl implements RetrieveAddonsService {
  public async retrieveAll (): Promise<Addon[]> {
    return [
      {
        name: 'Fake Package',
        url: 'gitlab.itgest.co.ao/public-addons/general/fake-package',
        description: 'A fake package only to mock.',
        image: 'https://icons8.com/icon/Xcmu3SUiwTXm/package',
        version: '1.0.1',
      },
    ]
  }
}
