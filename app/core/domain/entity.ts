import { UniqueEntityID } from './unique-entity-id'

export interface Options {
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID
  protected readonly _createdAt: Date
  protected readonly _updatedAt: Date
  protected _deletedAt?: Date
  protected readonly props: T

  protected constructor (props: T, id?: UniqueEntityID, options?: Options) {
    this._id = id ?? new UniqueEntityID()
    this.props = props

    this._createdAt = options?.createdAt || new Date()
    this._updatedAt = options?.updatedAt || new Date()
    this._deletedAt = options?.deletedAt
  }

  public get id (): UniqueEntityID {
    return this._id
  }

  public delete (): void {
    this._deletedAt = new Date()
  }

  public get isDeleted (): boolean {
    return !!this._deletedAt
  }

  public get deletedAt (): Date | undefined {
    return this._deletedAt
  }

  public get createdAt (): Date {
    return this._createdAt
  }

  public get updatedAt (): Date {
    return this._updatedAt
  }
}
