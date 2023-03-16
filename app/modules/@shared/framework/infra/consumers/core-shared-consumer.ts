import {
  CoreCommonInboxMessagesModel,
} from 'app/modules/admin/common/framework/infra/db/models/core-common-inbox-messages-model'
import { CoreBaseConsumer } from './core-base-consumer'

class CoreAdminCommonConsumer extends CoreBaseConsumer {
  constructor () {
    super('core.shared', CoreCommonInboxMessagesModel)
  }
}

export default new CoreAdminCommonConsumer()
