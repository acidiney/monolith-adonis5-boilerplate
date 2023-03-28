import {InboxProcessorContract} from 'app/modules/@shared/domain/ports'
import {UniqueEntityID} from 'app/core/domain'
import {CoreUserActivity} from 'app/modules/@shared/framework/infra/db'
import {HashAdapter} from 'app/modules/auth/usecases'

export interface ActivityProps {
  operation: string
  sessionId: string
  method?: string
  ip: string
  success: boolean
  error?: string
  createdAt: Date
}

interface ActivityUserProps extends ActivityProps {
  userId?: UniqueEntityID,
}

export class SaveActivityProcessor implements InboxProcessorContract<ActivityUserProps> {
  constructor (
    private readonly hashAdapter: HashAdapter
  ) {
  }
  public async perform (input: ActivityUserProps): Promise<void> {
    const lastActivityInThisSession = await CoreUserActivity.find({
      sessionId: input.sessionId,
    })
      .sort('createdAt', 1)
      .limit(1)
      .toArray()

    const isSameOperation = lastActivityInThisSession.length && (
      lastActivityInThisSession[0].operation === input.operation && input.method === 'GET'
    )

    if (isSameOperation) {
      return
    }

    await CoreUserActivity.insertOne({
      ...input,
      userId: input.userId?.toString() ?? null,
      hash: await this.hashAdapter.generate(input.sessionId, 'track_user_activity'),
      createdAt: new Date(input.createdAt),
    })
  }
}
