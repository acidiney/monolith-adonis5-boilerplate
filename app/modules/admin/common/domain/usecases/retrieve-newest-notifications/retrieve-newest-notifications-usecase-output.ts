export interface RetrieveNewestNotificationsUseCaseOutput {
  message?: string,
  title: string

  eventType: 'success' | 'error' | 'warning' | 'info',

  routePath?: string
  icon?: string
  createdAtText: string
  createdAt: string
}
