
interface Notification {
  id: string
  title?: string
  type?: string
}

export interface FindNotificationsUseCaseOutput {
  notifications: Notification[],
  activeNotifications: Notification[]
}
