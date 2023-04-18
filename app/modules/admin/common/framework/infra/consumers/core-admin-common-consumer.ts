import { CoreBaseConsumer } from 'app/modules/@shared/framework/infra/consumers'

class CoreAdminCommonConsumer extends CoreBaseConsumer {
  constructor () {
    super('core.admin.common', 'CORE_ADMIN_COMMON')
  }
}

export default new CoreAdminCommonConsumer()
