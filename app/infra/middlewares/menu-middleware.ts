import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class MenuMiddleware {
  public async handle (
    { auth }: HttpContextContract,
    next: () => Promise<void>
  ) {
    if (auth.isAuthenticated && auth.user) {
      // const { data, error } = await GenerateMenuUseCase.execute(
      //   auth.user.id,
      //   XSourceFont || AppTypeMemory.support
      // )

      // if (error) {
      //   logger.error(error)
      //   session.flash('errors', error)
      //   return response.redirect().back()
      // }

      // if (data) {
      //   session.put('menu', data)
      // }
    }

    await next()
  }
}
