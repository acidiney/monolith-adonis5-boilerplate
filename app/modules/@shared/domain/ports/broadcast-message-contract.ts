import {CoreBroadcastEnum} from 'app/modules/@shared/domain/types'

export interface BroadcastMessage<T> {
  type: CoreBroadcastEnum
  message: T
  meta: {
    userId: string | null
  }
}

export interface BroadcastMessageContract {
  publish: <T>(routeName: string, message: BroadcastMessage<T>) => Promise<void>
}
