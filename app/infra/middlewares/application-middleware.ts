import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MenuMiddleware {
  public async handle (
    { session }: HttpContextContract,
    next: () => Promise<void>
  ) {
    if(!session.get('header')) {
      session.put('header', {
        appName: 'Boilerplate',
        appDescription: 'Boilerplate Adonis5 + Vuejs + Inertia + i18n + Modular',
      })
    }

    next()
  }
}
