import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MenuMiddleware {
  public async handle (
    { session }: HttpContextContract,
    next: () => Promise<void>
  ) {
    if(!session.get('header')) {
      session.put('header', {
        appName: 'UMAPE',
        appDescription: 'Portal de monitoramento dos organismos',
      })
    }

    await next()
  }
}
