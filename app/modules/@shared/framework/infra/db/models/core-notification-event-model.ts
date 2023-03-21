import { CoreOutboxDatabase } from './core-outbox-database'

export interface CoreNotificationEventSchema {
  message: string | null
  title: string
  eventType: 'success' | 'error' | 'warning' | 'info'
  userId: string
  event: string
  routePath?: string
  icon?: string
  readAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export const CoreNotificationEventModel = CoreOutboxDatabase
  .collection<CoreNotificationEventSchema>('CoreNotifications')
