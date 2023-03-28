import {Controller} from 'app/core/ports'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class TrackInSessionUserActivityMiddleware {
  constructor (
    private readonly controller: Controller<HttpContextContract>,
  ) {}

  public async perform (input: HttpContextContract): Promise<any> {
    try {
      const output = await this.controller.perform(input)

      const alert = input.session.sessionId
      console.log(alert)

      return output
    } catch (e) {
      throw e
    }
  }
}
