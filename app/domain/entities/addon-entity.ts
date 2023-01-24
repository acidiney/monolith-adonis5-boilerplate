import { Entity } from 'app/core/domain'

export interface AddonProps {
  url: string
  description: string
  name: string,
  image?: string,
  lastUpdate: Date,
  version: Number
}

export class AddonEntity extends Entity<AddonProps> {
  public get name () {
    return this.props.name
  }

  public get description () {
    return this.props.description
  }

  public get url () {
    return this.props.url
  }

  public get lastUpdate () {
    return this.props.lastUpdate
  }

  public get version () {
    return this.props.version
  }

  public get image () {
    return this.props.image
  }

  public static create (props: AddonProps): AddonEntity {
    return new AddonEntity(props)
  }
}
