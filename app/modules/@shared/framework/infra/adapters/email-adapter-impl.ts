import { Edge } from 'edge.js'
import { resolve } from 'path'

import { EmailAdapter } from 'app/modules/@shared/domain/ports'

export class EmailAdapterImpl implements EmailAdapter {
  private readonly edge: Edge = new Edge({ cache: false })

  constructor (path?: string) {
    if (path) {
      this.edge.mount(path)
      return
    }

    this.edge.mount(resolve(__dirname, '..', './resource'))
  }

  public render (emailPath: any, vars: any): Promise<string> {
    return this.edge.render(emailPath, vars)
  }
}
