export interface RetrieveNewestNotificationsUseCaseInput {
  userId: string
  page: number
  perPage: number
  orderDirection: 'asc' | 'desc'
  hideOpenedNotifications: boolean
  withPagination: boolean
}

