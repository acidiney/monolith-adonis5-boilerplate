import { CoreOutboxDatabase } from './core-outbox-database'

export interface CoreInboxSchema {
  type: string
  payload: {
    [key: string]: any
  }
  meta: {
    userId: string | null
    outboxId: string
  },

  complete: boolean
  createdAt: Date
}

export const CoreGenerateInboxMessageModel = (modelName: string) =>CoreOutboxDatabase
  .collection<CoreInboxSchema>(modelName)
