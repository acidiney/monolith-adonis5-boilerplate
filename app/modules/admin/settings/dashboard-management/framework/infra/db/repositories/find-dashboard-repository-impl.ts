import { UniqueEntityID } from 'app/core/domain'
import { FindDashboardRepository } from '../../../../usecases/add-indicators-to-dashboard'
import { Dashboard } from '../../../../domain'

export class FindDashboardRepositoryImpl implements FindDashboardRepository {
  public async find (_id: UniqueEntityID): Promise<Dashboard | undefined> {
    // TODO: need to implement it with database
    // Choose between using noSQL or SQL

    return
  }
}
