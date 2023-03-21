import {CoreOutboxDatabase} from 'app/modules/@shared/framework/infra/db/models/core-outbox-database'

export interface CoreOutboxMessageSchema {
  routingKey: string
  type: string,
  payload: {
    [key: string]: any
  }
  meta: {
    userId: string | null
  }
  sentAt: Date | null
  createdAt: Date
}

export const CoreOutboxMessageModel =
  CoreOutboxDatabase.collection<CoreOutboxMessageSchema>('CoreOutboxMessages')
