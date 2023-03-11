import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class MessageBusProvider {
  constructor (protected app: ApplicationContract) {}

  public async boot () {
    // IoC container is ready
    if (this.app.environment === 'web') {
      const Env = this.app.container.use('Adonis/Core/Env')
      const {RabbitmqMessageBusServiceImpl} =
        await import('app/modules/@shared/framework/infra/services/rabbitmq-message-bus-service-impl')
      const messageBus = RabbitmqMessageBusServiceImpl.getInstance(Env.get('MESSAGE_BUS_URL'))

      await messageBus.start()
    }
  }

  public async shutdown () {
    if (this.app.environment === 'web') {
      const Env = this.app.container.use('Adonis/Core/Env')
      const {RabbitmqMessageBusServiceImpl} =
        await import('app/modules/@shared/framework/infra/services/rabbitmq-message-bus-service-impl')
      const messageBus = RabbitmqMessageBusServiceImpl.getInstance(Env.get('MESSAGE_BUS_URL'))

      await messageBus.stop()
    }
  }
}
