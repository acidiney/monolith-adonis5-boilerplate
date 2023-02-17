import {NotificationType} from 'app/modules/@shared/domain/types'

export interface UpdateUserNotificationsUseCaseInput {
  userId: string
  selectedNotificationIds: string[]
  type: NotificationType

}
