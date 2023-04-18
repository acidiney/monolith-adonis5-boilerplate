import { CoreBaseConsumer } from './core-base-consumer'

class CoreSharedCommonConsumer extends CoreBaseConsumer {
  constructor () {
    super('core.shared', 'CORE_SHARED')
  }
}

export default new CoreSharedCommonConsumer()
