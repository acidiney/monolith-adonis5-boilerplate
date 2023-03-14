import {CoreOutboxDatabase} from 'app/modules/@shared/framework/infra/db/models/core-outbox-database'

interface CoreCommonInboxMessagesSchema {
  type: string
  payload: {
    [key: string]: any
  }
  meta: {
    userId: string
    outboxId: string
  },

  complete: boolean
  createdAt: Date
}

export const CoreCommonInboxMessagesModel = CoreOutboxDatabase
  .collection<CoreCommonInboxMessagesSchema>('CoreCommonInboxMessages')

