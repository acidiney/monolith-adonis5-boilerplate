import { Identifier } from './identifier'
import {cuid} from '@ioc:Adonis/Core/Helpers'

/**
 * @param id is optional as string.
 * If id is provided returns itself else generate a new uuid
 */
export class UniqueEntityID extends Identifier<string | number> {
  constructor (id?: string | number) {
    super(id || cuid())
  }
}
