import { NotificationEntity } from '../../../domain'

export interface FindNotificationsRepository {
  findAll (): Promise<NotificationEntity[]>
  findActiveNotifications (userId: string): Promise<NotificationEntity[]>
}
