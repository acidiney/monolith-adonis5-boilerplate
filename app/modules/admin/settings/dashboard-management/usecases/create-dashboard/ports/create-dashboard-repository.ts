import { Dashboard } from '../../../domain'

export interface CreateDashboardRepository {
  persist: (dashboard: Dashboard) => Promise<void>
}
