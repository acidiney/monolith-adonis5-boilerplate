import { UniqueEntityID } from './unique-entity-id'

interface Options {
  createdAt?: Date
  updatedAt?: Date
  isDeleted?: boolean
}

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID
  protected readonly _createdAt: Date
  protected readonly _updatedAt: Date
  protected readonly props: T

  constructor (props: T, id?: UniqueEntityID, options?: Options) {
    this._id = id ?? new UniqueEntityID()
    this.props = props

    this._createdAt = options?.createdAt || new Date()
    this._updatedAt = options?.updatedAt || new Date()
  }

  get id (): UniqueEntityID {
    return this._id
  }

  get createdAt (): Date {
    return this._createdAt
  }

  get updatedAt (): Date {
    return this._updatedAt
  }
}
