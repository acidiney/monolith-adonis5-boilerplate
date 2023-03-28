import {RetrieveLatestActivitiesRepository} from 'app/modules/admin/common/usecases/retrieve-newest-activities'
import {UniqueEntityID} from 'app/core/domain'
import {ActivityProps} from 'app/modules/@shared/framework/infra/inbox-processor'
import {CoreUserActivity} from 'app/modules/@shared/framework/infra'

export class RetrieveNewestActivitiesRepositoryImpl implements RetrieveLatestActivitiesRepository {
  private readonly collection = CoreUserActivity
  public async find (userId: UniqueEntityID): Promise<ActivityProps[]> {
    const latestUserActivity = await this.collection.find({
      userId: userId.toString(),
    })
      .limit(1)
      .sort('createdAt', 'desc')
      .toArray()

    if (!latestUserActivity.length) {
      return []
    }

    const { sessionId } = latestUserActivity[0]

    return this.collection.find({
      $or: [
        {
          userId: userId.toString(),
        },
        {
          sessionId,
        },
      ],
    })
      .limit(6)
      .sort('createdAt', 'desc')
      .toArray()
  }
}
