import { CoreOutboxDatabase } from './core-outbox-database'

export interface CoreUserActivitySchema {
  hash: string
  success: boolean
  userId: string | null
  error?: string
  sessionId: string
  ip: string
  operation: string
  description: string
  createdAt: Date
}

export const CoreUserActivity = CoreOutboxDatabase
  .collection<CoreUserActivitySchema>('CoreUserActivities')
