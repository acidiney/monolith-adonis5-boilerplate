import { UniqueEntityID } from 'app/core/domain'
import { Dashboard } from '../../../domain'

export interface FindDashboardRepository {
  find(id: UniqueEntityID): Promise<Dashboard | undefined>
}
