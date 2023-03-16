import {CoreOutboxDatabase} from 'app/modules/@shared/framework/infra/db/models/core-outbox-database'

export interface CoreOutboxMessageSchema {
  routingKey: string
  payload: {
    type: string,
    [key: string]: any
  }
  meta: {
    userId: string
  }
  sentAt: Date | null
  createdAt: Date
}

export const CoreOutboxMessageModel =
  CoreOutboxDatabase.collection<CoreOutboxMessageSchema>('OutboxMessages')
