import {RetrieveLatestActivitiesRepository} from 'app/modules/admin/common/usecases/retrieve-newest-activities'
import {UniqueEntityID} from 'app/core/domain'
import {ActivityProps} from 'app/modules/@shared/framework/infra/inbox-processor'
import {CoreUserActivity} from 'app/modules/@shared/framework/infra'

export class RetrieveNewestActivitiesRepositoryImpl implements RetrieveLatestActivitiesRepository {
  private readonly collection = CoreUserActivity
  public async find (userId: UniqueEntityID): Promise<ActivityProps[]> {
    const latestUserActivity = await this.collection.aggregate([
      {
        '$sort': {
          'createdAt': 1,
        },
      }, {
        '$match': {
          'userId': userId.toString(),
        },
      }, {
        '$group': {
          '_id': '$sessionId',
        },
      }, {
        '$limit': 10,
      },
    ]).toArray()

    if (!latestUserActivity.length) {
      return []
    }

    const sessionIds = latestUserActivity.map((uActivity) => uActivity._id)

    return this.collection.find({
      sessionId: {
        $in: sessionIds,
      },
    })
      .limit(8)
      .sort('createdAt', 'desc')
      .toArray()
  }
}
