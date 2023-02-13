import {Controller} from 'app/core/ports'
import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'

export class CreateRoleViewController implements Controller<HttpContextContract> {
  public async perform ({ auth, inertia }: HttpContextContract): Promise<any> {
    console.log(auth, inertia)

    return Promise.resolve(undefined)
  }
}
