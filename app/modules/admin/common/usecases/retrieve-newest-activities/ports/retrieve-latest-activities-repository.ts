import {UniqueEntityID} from 'app/core/domain'
import {ActivityProps} from 'app/modules/@shared/framework/infra/inbox-processor'

export interface RetrieveLatestActivitiesRepository {
  find(userId: UniqueEntityID): Promise<ActivityProps[]>
}
