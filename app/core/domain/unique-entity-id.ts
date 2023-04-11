import { Identifier } from './identifier'

import { randomUUID } from 'node:crypto'

/**
 * @param id is optional as string.
 * If id is provided returns itself else generate a new uuid
 */
export class UniqueEntityID extends Identifier<string | number> {
  constructor (id?: string | number) {
    super(id || randomUUID())
  }
}
