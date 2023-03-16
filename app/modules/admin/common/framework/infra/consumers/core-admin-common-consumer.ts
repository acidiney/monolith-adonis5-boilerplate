import {
  CoreCommonInboxMessagesModel,
} from 'app/modules/admin/common/framework/infra/db/models/core-common-inbox-messages-model'

import { CoreBaseConsumer } from 'app/modules/@shared/framework/infra/consumers'

class CoreAdminCommonConsumer extends CoreBaseConsumer {
  constructor () {
    super('core.admin.common', CoreCommonInboxMessagesModel)
  }
}

export default new CoreAdminCommonConsumer()
