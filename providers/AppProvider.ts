import type { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
  }

  public async boot () {
    // IoC container is ready
    const HealthCheck = this.app.container.use('Adonis/Core/HealthCheck')
    const Bull = await import('@ioc:Rocketseat/Bull')

    HealthCheck.addChecker('queues', async () => {
      return {
        displayName: 'Queues',
        health: {
          healthy: true,
          message: 'Everything works fine',
        },
        meta: {
          names: Object.keys(Bull.default.queues),
        },
      }
    })
  }

  public async ready () {
    // App is ready

    if (this.app.environment === 'web') {
      await import('../start/socket')
    }
  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
