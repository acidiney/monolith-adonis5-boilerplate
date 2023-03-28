import { CoreSharedInboxMessagesModel } from '../db/models/core-shared-inbox-messages-model'
import { CoreBaseConsumer } from './core-base-consumer'

class CoreSharedCommonConsumer extends CoreBaseConsumer {
  constructor () {
    super('core.shared', CoreSharedInboxMessagesModel)
  }
}

export default new CoreSharedCommonConsumer()
