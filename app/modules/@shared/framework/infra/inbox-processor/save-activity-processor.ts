import {InboxProcessorContract} from 'app/modules/@shared/domain/ports'
import {UniqueEntityID} from 'app/core/domain'
import {CoreUserActivity} from 'app/modules/@shared/framework/infra/db'
import {HashAdapter} from 'app/modules/auth/usecases'

export interface ActivityProps {
  userId?: UniqueEntityID,
  operation: string
  description: string
  sessionId: string
  ip: string
  success: boolean
  error?: string
}

export class SaveActivityProcessor implements InboxProcessorContract<ActivityProps> {
  constructor (
    private readonly hashAdapter: HashAdapter
  ) {
  }
  public async perform (input: ActivityProps): Promise<void> {
    await CoreUserActivity.insertOne({
      ...input,
      userId: input.userId?.toString() ?? null,
      hash: await this.hashAdapter.generate(input.sessionId, 'track_user_activity'),
      createdAt: new Date(),
    })
  }
}
