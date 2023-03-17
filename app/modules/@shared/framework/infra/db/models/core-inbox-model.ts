import { CoreOutboxDatabase } from './core-outbox-database'

export interface CoreInboxSchema<T> {
  type: string
  payload: T
  meta: {
    userId: string | null
    outboxId: string
  },

  status: 'PENDING' | 'STARTED',
  complete: boolean
  createdAt: Date
}

export const CoreGenerateInboxMessageModel = <T>(modelName: string) =>CoreOutboxDatabase
  .collection<CoreInboxSchema<T>>(modelName)
