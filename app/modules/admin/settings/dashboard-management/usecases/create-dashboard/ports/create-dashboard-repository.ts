export interface CreateDashboardRepository {
  persist: (dashboard: Dashboard) => Promise<void>
}
