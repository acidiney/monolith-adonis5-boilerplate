import { CoreOutboxDatabase } from './core-outbox-database'

export interface CoreNotificationEventSchema {
  hash: string
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

const CoreNotificationEventModel = CoreOutboxDatabase
  .collection<CoreNotificationEventSchema>('CoreNotifications')

const installIndexOnCoreNotificationEventModel = async () => {
  await CoreNotificationEventModel.createIndex({ userId: 1, createdAt: -1 })
}

export {
  CoreNotificationEventModel,
  installIndexOnCoreNotificationEventModel,
}
