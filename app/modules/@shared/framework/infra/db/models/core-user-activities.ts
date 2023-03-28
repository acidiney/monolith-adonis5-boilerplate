import { CoreOutboxDatabase } from './core-outbox-database'

export interface CoreUserActivitySchema {
  hash: string
  success: boolean
  userId: string | null
  error?: string
  sessionId: string
  ip: string
  operation: string
  createdAt: Date
}

const CoreUserActivity = CoreOutboxDatabase
  .collection<CoreUserActivitySchema>('CoreUserActivities')

const installIndexesOnCoreUserActivity = async () => {
  await CoreUserActivity.createIndex({ userId: 1, createdAt: -1 })
  await CoreUserActivity.createIndex({ sessionId: 1, createdAt: -1 })
}

export {
  CoreUserActivity,
  installIndexesOnCoreUserActivity,
}
