import { CoreActivitiesDatabase } from './core-activities-database'

export interface CoreNotificationEventSchema {
  message: string | null
  title: string
  eventType: 'success' | 'error' | 'warning' | 'info'
  userId: string
  routePath?: string
  icon?: string
  readAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export const CoreNotificationEventModel = CoreActivitiesDatabase
  .collection<CoreNotificationEventSchema>('core_notifications')
